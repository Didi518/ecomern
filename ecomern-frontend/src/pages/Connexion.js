import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Inscription.css';

function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {}
  return (
    <Container>
      <Row>
        <Col md={6} className="login__image--container"></Col>
        <Col md={6} className="login__form--container">
          <Form style={{ width: '100%' }}>
            <h1>Connectez-vous à votre compte</h1>
            <Form.Group>
              <Form.Label>Adresse E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez votre adresse e-mail"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mot de Passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit">Connexion</Button>
            </Form.Group>
            <p>
              Vous n'êtes pas encore inscrit?{' '}
              <Link to="/inscription">Créez votre compte</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Connexion;
