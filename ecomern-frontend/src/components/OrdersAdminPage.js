import React, { useEffect, useState } from 'react';
import { Badge, Button, Modal, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from '../axios';
import Loading from './Loading';

const OrdersAdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  function markShipped(orderId, ownerId) {
    axios
      .patch(`/commandes/${orderId}/livraison`, { ownerId })
      .then(({ data }) => setOrders(data))
      .catch((e) => console.log(e));
  }

  function showOrder(producstObj) {
    let productsToShow = products.filter((product) => producstObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = producstObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    setShow(true);
    setOrderToShow(productsToShow);
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get('/commandes')
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-4">Aucune commande pour le moment</h1>;
  }

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom du Client</th>
            <th>Articles</th>
            <th>Prix Total</th>
            <th>Adresse</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order._id}</td>
              <td>{order.owner?.name}</td>
              <td>{order.count}</td>
              <td>{order.total}€</td>
              <td>{order.address}</td>
              <td>
                {order.status === 'en cours' ? (
                  <Button
                    size="sm"
                    onClick={() => markShipped(order._id, order.owner?._id)}
                  >
                    Noter comme livré
                  </Button>
                ) : (
                  <Badge bg="success">Livré</Badge>
                )}
              </td>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => showOrder(order.products)}
              >
                Voir la commande <i className="fa fa-eye"></i>
              </span>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Détails de la commande</Modal.Title>
        </Modal.Header>
        {orderToShow.map((order) => (
          <div className="order-details__container d-flex justify-content-around py-2">
            <img
              src={order.pictures[0].url}
              alt={order.name}
              style={{ maxWidth: 100, height: 100, objectFit: 'cover' }}
            />
            <p>
              <span>{order.count} x </span> {order.name}
            </p>
            <p>Prix: ${Number(order.price) * order.count}</p>
          </div>
        ))}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrdersAdminPage;
