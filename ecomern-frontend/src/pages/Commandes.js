import React, { useEffect, useState } from 'react';
import { Badge, Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from '../axios';
import './Commandes.css';
import Loading from '../components/Loading';

function Commandes() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/utilisateurs/${user._id}/commandes`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, [user._id]);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-3">Aucune commande pour le moment</h1>;
  }

  return (
    <Container>
      <h1 className="text-center">Vos commandes</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Total</th>
            <th>&nbsc;</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order._id}</td>
              <td>
                <Badge
                  bg={`${order.status === 'En cours' ? 'warning' : 'succes'}`}
                  text="white"
                >
                  {order.status}
                </Badge>
              </td>
              <td>{order.total}€</td>
              <td>{order._id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Commandes;
