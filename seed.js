require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => { console.log('❌ DB Error:', err); process.exit(1); });

const products = [
  { name: 'Wireless Bluetooth Headphones', description: 'Premium sound quality with noise cancellation. 30-hour battery life. Foldable design for easy portability.', price: 1999, originalPrice: 3999, category: 'Electronics', stock: 50, featured: true, image: 'https://via.placeholder.com/300x200?text=Headphones' },
  { name: 'Men\'s Casual T-Shirt', description: 'Comfortable 100% cotton t-shirt. Available in multiple sizes. Perfect for everyday wear.', price: 399, originalPrice: 799, category: 'Fashion', stock: 100, featured: true, image: 'https://via.placeholder.com/300x200?text=T-Shirt' },
  { name: 'Stainless Steel Water Bottle', description: 'Double-wall insulated bottle. Keeps drinks cold for 24hrs and hot for 12hrs. 1 litre capacity.', price: 699, originalPrice: 1200, category: 'Home & Kitchen', stock: 75, featured: false, image: 'https://via.placeholder.com/300x200?text=Bottle' },
  { name: 'Yoga Mat Premium', description: 'Non-slip 6mm thick yoga mat with carry strap. Eco-friendly TPE material. Great for home workouts.', price: 849, originalPrice: 1500, category: 'Sports', stock: 40, featured: true, image: 'https://via.placeholder.com/300x200?text=Yoga+Mat' },
  { name: 'JavaScript: The Good Parts', description: 'Essential guide to JavaScript by Douglas Crockford. Must-read for every web developer.', price: 499, originalPrice: 799, category: 'Books', stock: 30, featured: false, image: 'https://via.placeholder.com/300x200?text=JS+Book' },
  { name: 'Face Moisturizer SPF 50', description: 'Lightweight daily moisturizer with sun protection. Suitable for all skin types. 50ml bottle.', price: 599, originalPrice: 999, category: 'Beauty', stock: 60, featured: false, image: 'https://via.placeholder.com/300x200?text=Moisturizer' },
  { name: 'Smart LED Desk Lamp', description: 'Touch control LED lamp with 3 colour modes and USB charging port. Perfect for study and work.', price: 1299, originalPrice: 2000, category: 'Electronics', stock: 35, featured: true, image: 'https://via.placeholder.com/300x200?text=Desk+Lamp' },
  { name: 'Running Sports Shoes', description: 'Lightweight mesh running shoes with cushioned sole. Available in sizes 6-11. Great for jogging.', price: 1599, originalPrice: 2999, category: 'Sports', stock: 45, featured: true, image: 'https://via.placeholder.com/300x200?text=Shoes' },
  { name: 'Non-Stick Cookware Set', description: 'Set of 3 pans with granite coating. Dishwasher safe. Induction compatible. Comes with glass lids.', price: 2499, originalPrice: 4000, category: 'Home & Kitchen', stock: 20, featured: false, image: 'https://via.placeholder.com/300x200?text=Cookware' },
  { name: 'Building Blocks Set (200pcs)', description: 'Creative building blocks for kids aged 3+. BPA-free plastic. Boosts creativity and motor skills.', price: 799, originalPrice: 1299, category: 'Toys', stock: 55, featured: false, image: 'https://via.placeholder.com/300x200?text=Blocks' },
  { name: 'Wireless Phone Charger', description: '15W fast wireless charging pad compatible with all Qi-enabled devices. LED indicator included.', price: 999, originalPrice: 1799, category: 'Electronics', stock: 80, featured: false, image: 'https://via.placeholder.com/300x200?text=Charger' },
  { name: 'Women\'s Kurti', description: 'Beautiful floral print cotton kurti. Suitable for casual and semi-formal occasions. Multiple sizes.', price: 599, originalPrice: 1099, category: 'Fashion', stock: 90, featured: false, image: 'https://via.placeholder.com/300x200?text=Kurti' },
];

async function seedDB() {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@shopease.com',
      password: 'admin123',
      isAdmin: true
    });
    await admin.save();
    console.log('👤 Admin created — Email: admin@shopease.com | Password: admin123');

    // Create test user
    const testUser = new User({
      name: 'Venkatapathi Raju',
      email: 'raju@test.com',
      password: 'raju123',
      isAdmin: false
    });
    await testUser.save();
    console.log('👤 Test user created — Email: raju@test.com | Password: raju123');

    // Insert products
    await Product.insertMany(products);
    console.log(`📦 ${products.length} products added`);

    console.log('\n✅ Database seeded successfully!');
    console.log('🚀 Run: npm start  →  Open: http://localhost:3000');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seedDB();
