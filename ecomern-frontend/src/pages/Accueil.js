import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import categories from '../categories';
import './Accueil.css';

function Accueil() {
  return (
    <div>
      <img
        src="https://zupimages.net/up/22/26/pttr.png"
        alt="Bannière Keke-Store"
        className="home-banner"
      />
      <div className="featured-products-container container mt-4">
        <h2>Derniers articles</h2>
        {/* nouveautés appelés depuis le back */}
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
