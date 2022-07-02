import axios from '../axios';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import categories from '../categories';
import './Accueil.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '../features/productSlice';
import ProductPreview from '../components/ProductPreview';

function Accueil() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);

  useEffect(() => {
    axios.get('/articles').then(({ data }) => dispatch(updateProducts(data)));
  }, [dispatch]);

  return (
    <div>
      <img
        src="https://zupimages.net/up/22/26/jvw3.png"
        alt="Bannière Keke-Store"
        className="home-banner"
      />
      <div className="featured-products-container container mt-4">
        <h2>Derniers articles</h2>
        {/* nouveautés appelés depuis le back */}
        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>
        <div>
          <Link
            to="/categorie/toutes"
            style={{
              textAlign: 'right',
              display: 'block',
              textDecoration: 'none',
            }}
          >
            En voir plus encore {'>>'}
          </Link>
        </div>
      </div>
      {/* bannière soldes */}
      <div className="sale__banner--container mt-4">
        <img
          src="https://blog.42stores.com/pub/2014/bannieres-soldes-ete/light-slider-980px.jpg"
          alt="Bannière soldes"
        />
      </div>
      <div className="recent-products-container container mt-4">
        <h2>Catégories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              to={`/categorie/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: '10px',
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Accueil;
