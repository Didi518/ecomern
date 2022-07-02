import React from 'react';
import { Alert, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './Panier.css';

function Panier() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;

  let cart = products.filter((product) => userCartObj[product._id] != null);

  return (
    <Container style={{ minHeight: '95vh' }} className="cart-container">
      <Row>
        <h1 className="pt-2 h3">Mon Panier</h1>
        {cart.length == 0 ? (
          <Alert variant="info">
            Votre panier est vide. Ajoutez des articles au panier
          </Alert>
        ) : (
          <div>Régler la commande</div>
        )}
      </Row>
    </Container>
  );
}

export default Panier;
