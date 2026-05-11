const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: 0 },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Books', 'Beauty', 'Toys', 'Other']
  },
  image: { type: String, default: 'default-product.jpg' },
  stock: { type: Number, required: true, default: 0 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
