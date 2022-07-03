import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDeleteProductMutation } from '../services/appApi';
import './DashboardProducts.css';

function DashboardProducts() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();

  // supprimer article
  function handleDeleteProduct(id) {
    // logique ici
    if (window.confirm('Êtes-vous sur ?'))
      deleteProduct({ product_id: id, user_id: user._id });
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th></th>
          <th>ID de l'article</th>
          <th>Nom de l'article</th>
          <th>Prix de l'article</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr>
            <td>
              <img
                alt={product.name}
                src={product.pictures[0].url}
                className="dashboard-product-preview"
              />
            </td>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <Button
                onClick={() => handleDeleteProduct(product._id, user._id)}
                disabled={isLoading}
              >
                Supprimer
              </Button>
              <Link
                to={`/article/${product._id}/edit`}
                className="btn btn-warning"
              >
                Modifier
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DashboardProducts;
