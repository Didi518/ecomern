import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { Alert, Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CheckoutForm from '../components/CheckoutForm';
import {
  useDecreaseCartProductMutation,
  useIncreaseCartProductMutation,
  useRemoveFromCartMutation,
} from '../services/appApi';
import './Panier.css';

const stripePromise = loadStripe(
  'pk_test_51LHDsbKXldPn3Cphky4DuVIRfE2G6dPwA4T8umm31bn5AFYErUHaXBHisFMdapNs06dokmfkjv2iKajBYzzYgV8C00qtKJ7sdN'
);

function Panier() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;

  let cart = products.filter((product) => userCartObj[product._id] != null);

  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

  function handleDecrease(product) {
    const quantity = user.cart.count;
    if (quantity <= 0) return alert('Opération impossible');
    decreaseCart(product);
  }

  return (
    <Container style={{ minHeight: '95vh' }} className="cart-container">
      <Row>
        <Col md={7}>
          <h1 className="pt-2 h3">Mon Panier</h1>
          {cart.length === 0 ? (
            <Alert variant="info">
              Votre panier est vide. Ajoutez des articles au panier
            </Alert>
          ) : (
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </Col>
        <Col md={5}>
          {cart.length > 0 && (
            <>
              <Table responsive="sm" className="cart-table">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Article</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Sous-total</th>
                  </tr>
                </thead>
                <tbody>
                  {/* défiler les articles du panier */}
                  {cart.map((item) => (
                    <tr>
                      <td>&nbsp;</td>
                      <td>
                        {!isLoading && (
                          <i
                            className="fa fa-times"
                            style={{ marginRight: 10, cursor: 'pointer' }}
                            onClick={() =>
                              removeFromCart({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                        )}
                        <img
                          alt={item.name}
                          src={item.pictures[0].url}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: 'cover',
                          }}
                        />
                      </td>
                      <td>{item.price}€</td>
                      <td>
                        <span className="quantity-indicator">
                          <i
                            className="fa fa-minus-circle"
                            onClick={() =>
                              handleDecrease({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                          <span>{user.cart[item._id]}</span>
                          <i
                            className="fa fa-plus-circle"
                            onClick={() =>
                              increaseCart({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                        </span>
                      </td>
                      <td>{item.price * user.cart[item._id]}€</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                <h3 className="h4 pt-4">Total: {user.cart.total}€</h3>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Panier;
