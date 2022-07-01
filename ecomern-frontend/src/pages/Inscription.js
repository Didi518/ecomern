import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Inscription.css';

function Inscription() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Row>
        <Col md={6} className="signup__form--container">
          <Form style={{ width: '100%' }}>
            <h1>Créez votre compte</h1>
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
        <Col md={6} className="signup__image--container"></Col>
      </Row>
    </Container>
  );
}

export default Inscription;
