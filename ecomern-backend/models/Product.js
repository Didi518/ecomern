const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'est requis'],
    },
    description: {
      type: String,
      required: [true, 'est requis'],
    },
    price: {
      type: String,
      required: [true, 'est requis'],
    },
    category: {
      type: String,
      required: [true, 'est requis'],
    },
    pictures: {
      type: Array,
      required: true,
    },
  },
  { minimize: false }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
