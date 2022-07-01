import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../services/appApi';
import axios from '../axios';
import './NouvelArticle.css';

function NouvelArticle() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert('Merci de renseigner chaque champ');
    }
    createProduct({ name, description, price, category, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      }
    );
  }

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dyorb9ngw',
        uploadPreset: 'zsfju8ft',
      },
      (error, result) => {
        if (!error && result.event === 'success') {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <h1 className="mt-4">Ajouter un nouvel article</h1>
            {isSuccess && <Alert variant="success">Article ajouté</Alert>}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Nom de l'article</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le nom de l'article"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description de l'article</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description de l'article"
                style={{ height: '100px' }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix de l'article(€)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Prix (€)"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label>Catégorie</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Choisissez une catégorie --
                </option>
                <option value="hitech">Hi Tech</option>
                <option value="smartphone">Smartphones</option>
                <option value="mode">Mode</option>
                <option value="laptops">Laptops</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Télécharger des images
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} alt="" />
                    {/* ajout d'un icone pour supprimer */}
                    {imgToRemove !== image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>
            <Form.Group>
              <Button type="submit" disabled={isLoading || isSuccess}>
                Ajouter l'article
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
}

export default NouvelArticle;
