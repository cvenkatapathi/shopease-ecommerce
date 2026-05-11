const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const { isAuth } = require('../middleware/auth');

// View Cart
router.get('/', isAuth, (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.render('cart/index', { cart, total, title: 'My Cart - ShopEase' });
});

// Add to Cart
router.post('/add/:id', isAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash('error', 'Product not found');
      return res.redirect('/products');
    }
    if (!req.session.cart) req.session.cart = [];
    const cartItem = req.session.cart.find(i => i.productId === req.params.id);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      req.session.cart.push({
        productId: req.params.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    req.flash('success', `${product.name} added to cart!`);
    res.redirect('back');
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
});

// Update Cart Quantity
router.post('/update/:id', isAuth, (req, res) => {
  const { quantity } = req.body;
  const cart = req.session.cart || [];
  const item = cart.find(i => i.productId === req.params.id);
  if (item) {
    item.quantity = Math.max(1, parseInt(quantity));
  }
  res.redirect('/cart');
});

// Remove from Cart
router.get('/remove/:id', isAuth, (req, res) => {
  req.session.cart = (req.session.cart || []).filter(i => i.productId !== req.params.id);
  req.flash('success', 'Item removed from cart');
  res.redirect('/cart');
});

// Checkout Page
router.get('/checkout', isAuth, (req, res) => {
  const cart = req.session.cart || [];
  if (cart.length === 0) {
    req.flash('error', 'Your cart is empty');
    return res.redirect('/cart');
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.render('cart/checkout', { cart, total, title: 'Checkout - ShopEase' });
});

// Place Order
router.post('/checkout', isAuth, async (req, res) => {
  try {
    const cart = req.session.cart || [];
    if (cart.length === 0) {
      req.flash('error', 'Your cart is empty');
      return res.redirect('/cart');
    }
    const { fullName, address, city, state, pincode, phone } = req.body;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = new Order({
      user: req.session.user.id,
      items: cart.map(item => ({
        product: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      totalAmount: total,
      shippingAddress: { fullName, address, city, state, pincode, phone },
      paymentMethod: 'Cash on Delivery'
    });

    await order.save();
    req.session.cart = [];
    req.flash('success', '🎉 Order placed successfully! Thank you for shopping with us.');
    res.redirect('/cart/orders');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Order failed. Try again.');
    res.redirect('/cart/checkout');
  }
});

// My Orders
router.get('/orders', isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.session.user.id }).sort({ createdAt: -1 });
    res.render('cart/orders', { orders, title: 'My Orders - ShopEase' });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
