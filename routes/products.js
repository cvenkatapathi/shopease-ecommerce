const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// All Products with Search & Filter
router.get('/', async (req, res) => {
  try {
    const { search, category, sort, minPrice, maxPrice } = req.query;
    let query = { stock: { $gt: 0 } };

    if (search) query.name = { $regex: search, $options: 'i' };
    if (category && category !== 'All') query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price-low') sortOption = { price: 1 };
    if (sort === 'price-high') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };

    const products = await Product.find(query).sort(sortOption);
    const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Books', 'Beauty', 'Toys', 'Other'];
    res.render('products/index', { products, categories, search, category, sort, minPrice, maxPrice, title: 'Products - ShopEase' });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Single Product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash('error', 'Product not found');
      return res.redirect('/products');
    }
    const related = await Product.find({ category: product.category, _id: { $ne: product._id } }).limit(4);
    res.render('products/detail', { product, related, title: `${product.name} - ShopEase` });
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
});

module.exports = router;
