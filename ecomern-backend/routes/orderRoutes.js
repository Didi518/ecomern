const router = require('express').Router();
const Order = require('../models/Order');
const User = require('../models/User');

// création de la commande
router.post('/', async (req, res) => {
  const { userId, cart, country, address } = req.body;
  try {
    const user = await User.findById(userId);
    const order = await Order.create({
      owner: user._id,
      products: cart,
      country,
      address,
    });
    order.count = cart.count;
    order.total = cart.total;
    await order.save();
    user.cart = { total: 0, count: 0 };
    user.orders.push(order);
    user.markModified('orders');
    await user.save(res.status(200).json(user));
  } catch (e) {
    res.status(400).json(e.message);
  }
});

// liste des commandes
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('owner', ['email', 'name']);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

// commande livrée
router.patch('/:id/livraison', async (req, res) => {
  const { ownerId } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(ownerId);
    await Order.findByIdAndUpdate(id, { status: 'livrée' });
    const orders = await Order.find().populate('owner', ['email', 'name']);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

module.exports = router;
