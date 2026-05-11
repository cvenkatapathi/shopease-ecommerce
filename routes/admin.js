const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const { isAdmin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Admin Dashboard
router.get('/', isAdmin, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const recentOrders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(5);
    const revenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]);
    res.render('admin/dashboard', {
      totalProducts, totalUsers, totalOrders, recentOrders,
      revenue: revenue[0]?.total || 0, title: 'Admin Dashboard - ShopEase'
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// ── PRODUCTS ──

// List Products
router.get('/products', isAdmin, async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.render('admin/products', { products, title: 'Manage Products - ShopEase' });
});

// Add Product Form
router.get('/products/add', isAdmin, (req, res) => {
  const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Books', 'Beauty', 'Toys', 'Other'];
  res.render('admin/product-form', { product: null, categories, title: 'Add Product' });
});

// Add Product
router.post('/products/add', isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, originalPrice, category, stock, featured } = req.body;
    const product = new Product({
      name, description, price: Number(price),
      originalPrice: Number(originalPrice) || 0,
      category, stock: Number(stock),
      featured: featured === 'on',
      image: req.file ? req.file.filename : 'default-product.jpg'
    });
    await product.save();
    req.flash('success', 'Product added successfully!');
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to add product');
    res.redirect('/admin/products/add');
  }
});

// Edit Product Form
router.get('/products/edit/:id', isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Books', 'Beauty', 'Toys', 'Other'];
  res.render('admin/product-form', { product, categories, title: 'Edit Product' });
});

// Update Product
router.post('/products/edit/:id', isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, originalPrice, category, stock, featured } = req.body;
    const update = { name, description, price: Number(price), originalPrice: Number(originalPrice) || 0, category, stock: Number(stock), featured: featured === 'on' };
    if (req.file) update.image = req.file.filename;
    await Product.findByIdAndUpdate(req.params.id, update);
    req.flash('success', 'Product updated successfully!');
    res.redirect('/admin/products');
  } catch (err) {
    req.flash('error', 'Update failed');
    res.redirect('/admin/products');
  }
});

// Delete Product
router.get('/products/delete/:id', isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  req.flash('success', 'Product deleted');
  res.redirect('/admin/products');
});

// ── ORDERS ──
router.get('/orders', isAdmin, async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.render('admin/orders', { orders, title: 'Manage Orders - ShopEase' });
});

// Update Order Status
router.post('/orders/status/:id', isAdmin, async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
  req.flash('success', 'Order status updated');
  res.redirect('/admin/orders');
});

// ── USERS ──
router.get('/users', isAdmin, async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.render('admin/users', { users, title: 'Manage Users - ShopEase' });
});

module.exports = router;
