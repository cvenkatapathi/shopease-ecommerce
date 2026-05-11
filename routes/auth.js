const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET Login
router.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('auth/login', { title: 'Login - ShopEase' });
});

// POST Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/auth/login');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/auth/login');
    }
    req.session.user = { id: user._id, name: user.name, email: user.email };
    req.session.isAdmin = user.isAdmin;
    req.flash('success', `Welcome back, ${user.name}!`);
    res.redirect(user.isAdmin ? '/admin' : '/');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Something went wrong');
    res.redirect('/auth/login');
  }
});

// GET Register
router.get('/register', (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('auth/register', { title: 'Register - ShopEase' });
});

// POST Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/auth/register');
    }
    if (password.length < 6) {
      req.flash('error', 'Password must be at least 6 characters');
      return res.redirect('/auth/register');
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'Email already registered');
      return res.redirect('/auth/register');
    }
    const user = new User({ name, email, password });
    await user.save();
    req.session.user = { id: user._id, name: user.name, email: user.email };
    req.session.isAdmin = false;
    req.flash('success', `Welcome to ShopEase, ${name}!`);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Registration failed. Try again.');
    res.redirect('/auth/register');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = router;
