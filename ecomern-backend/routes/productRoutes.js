const router = require('express').Router();
const Product = require('../models/Product');
const User = require('../models/User');

// récupérer les articles
router.get('/api/data', async (req, res) => {
  try {
    const sort = { _id: -1 };
    const products = await Product.find().sort(sort);
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// créer un article
router.post('/api/data', async (req, res) => {
  try {
    const { name, description, price, category, images: pictures } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      pictures,
    });
    const products = await Product.find();
    res.status(201).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// mettre à jour un article
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { name, description, price, category, images: pictures } = req.body;
    const product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      pictures,
    });
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// supprimer un article
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  try {
    const user = await User.findById(user_id);
    if (!user.isAdmin) return res.status(401).json('Permission requise');
    await Product.findByIdAndDelete(id);
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    const similar = await Product.find({ category: product.category }).limit(5);
    res.status(200).json({ product, similar });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/categorie/:category', async (req, res) => {
  const { category } = req.params;
  try {
    let products;
    if (category == 'tout') {
      products = await Product.find().sort([['date', -1]]);
    } else {
      products = await Product.find({ category });
    }
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// routes du panier
router.post('/ajouter-au-panier', async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    if (user.cart[productId]) {
      userCart[productId] += 1;
    } else {
      userCart[productId] = 1;
    }
    userCart.count += 1;
    userCart.total = Number(userCart.total) + Number(price);
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/augmenter-panier', async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total += Number(price);
    userCart.count += 1;
    userCart[productId] += 1;
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/reduire-panier', async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(price);
    userCart.count -= 1;
    userCart[productId] -= 1;
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/supprimer-du-panier', async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(userCart[productId]) * Number(price);
    userCart.count -= userCart[productId];
    delete userCart[productId];
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
