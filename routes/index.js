const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Home Page
router.get('/', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true, stock: { $gt: 0 } }).limit(8);
    const latestProducts = await Product.find({ stock: { $gt: 0 } }).sort({ createdAt: -1 }).limit(8);
    const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Books', 'Beauty', 'Toys', 'Other'];
    res.render('index', { featuredProducts, latestProducts, categories, title: 'ShopEase - Your One Stop Shop' });
  } catch (err) {
    console.error(err);
    res.render('index', { featuredProducts: [], latestProducts: [], categories: [], title: 'ShopEase' });
  }
});

module.exports = router;
