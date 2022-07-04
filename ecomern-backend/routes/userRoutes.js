const router = require('express').Router();
const User = require('../models/User');
const Order = require('../models/Order');

// inscription
router.post('/inscription', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (e) {
    if (e.code === 11000) return res.status(400).send('E-mail déjà enregistré');
    res.status(400).send(e.message);
  }
});

// connexion
router.post('/connexion', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    res.json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// get users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).populate('orders');
    res.json(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// obtenir les commande d'un user
router.get('/:id/commandes', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate('orders');
    res.json(user.orders);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
