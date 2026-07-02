#  ShopEase — Full Stack E-Commerce Website

A complete full-stack e-commerce web application built with **HTML, CSS, Node.js, Express, and MongoDB**.

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.x-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green?style=for-the-badge&logo=mongodb)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?style=for-the-badge&logo=bootstrap)

---

##  Live Demo
   **[View Live](#)** ← *(Add Render/Railway deployment link)*
   **[Watch Demo Video](#)** ← *(Add Loom video link)*

---

##  Features

###  User Features
-  Register & Login with secure password hashing (bcrypt)
-  Browse & Search products by name, category, price
-  Filter & Sort products
-  Add to Cart & update quantities
-  Checkout with shipping address
-  View order history with status tracking

###  Admin Features
-  Admin Dashboard with live stats (products, users, orders, revenue)
-  Add / Edit / Delete products with image upload
-  Mark products as Featured
-  Manage all orders & update order status
-  View all registered users

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Bootstrap 5, EJS Templates |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | bcryptjs, express-session |
| File Upload | Multer |
| Templating | EJS |

---

##  Project Structure

```
ecommerce/
├── server.js              # Entry point
├── seed.js                # Database seeder
├── .env                   # Environment variables
├── package.json
│
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
│
├── routes/
│   ├── index.js
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   └── admin.js
│
├── middleware/
│   └── auth.js
│
├── views/
│   ├── index.ejs          # Home page
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   └── product-card.ejs
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── products/
│   │   ├── index.ejs
│   │   └── detail.ejs
│   ├── cart/
│   │   ├── index.ejs
│   │   ├── checkout.ejs
│   │   └── orders.ejs
│   └── admin/
│       ├── dashboard.ejs
│       ├── products.ejs
│       ├── product-form.ejs
│       ├── orders.ejs
│       └── users.ejs
│
└── public/
    ├── css/style.css
    ├── js/main.js
    └── images/
```

---

##  Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/[your-username]/shopease-ecommerce.git
cd shopease-ecommerce

# 2. Install dependencies
npm install

# 3. Configure environment
# Edit .env file:
MONGODB_URI=mongodb://localhost:27017/ecommerce
SESSION_SECRET=your_secret_key_here
PORT=3000

# 4. Seed sample data
node seed.js

# 5. Start server
npm start
```

Open: **http://localhost:3000**

---

##  Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@shopease.com | admin123 |
| User | raju@test.com | raju123 |

---

## 📸 Screenshots

> *(Add screenshots after running the project)*

| Page | Screenshot |
|------|-----------|
| Home Page | *(add image)* |
| Products Page | *(add image)* |
| Cart | *(add image)* |
| Admin Dashboard | *(add image)* |

---

##  Future Enhancements
- [ ] Payment gateway integration (Razorpay)
- [ ] Product reviews & ratings
- [ ] Email notifications for orders
- [ ] Wishlist feature
- [ ] React.js frontend upgrade

---

##  Built By

**Chamarthi Venkatapathi Raju**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/venkatapathi-raju-chamarthi)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/[your-username])
[![Email](https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail)](mailto:ccvenkatapathiraju12@gmail.com)
