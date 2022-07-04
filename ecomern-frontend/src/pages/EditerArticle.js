import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateProductMutation } from '../services/appApi';
import axios from '../axios';
import './NouvelArticle.css';

function EditerArticle() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [updateProduct, { isError, error, isLoading, isSuccess }] =
    useUpdateProductMutation();

  useEffect(() => {
    axios
      .get('/articles/' + id)
      .then(({ data }) => {
        const product = data.product;
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setImages(product.pictures);
        setPrice(product.price);
      })
      .catch((e) => console.log(e));
  }, [id]);

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
    updateProduct({ id, name, description, price, category, images }).then(
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
            <h1 className="mt-4">Modifier l'article</h1>
            {isSuccess && <Alert variant="success">Article mis à jour</Alert>}
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
              <Form.Select value={category}>
                <option disabled selected>
                  -- Choisissez une catégorie --
                </option>
                <option value="hitech">Hitech</option>
                <option value="smartphone">Smartphone</option>
                <option value="laptop">Laptop</option>
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
                Mettre à jour l'article
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
}

export default EditerArticle;
