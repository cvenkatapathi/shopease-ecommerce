// Check if user is logged in
const isAuth = (req, res, next) => {
  if (req.session.user) return next();
  req.flash('error', 'Please login to continue');
  res.redirect('/auth/login');
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.isAdmin) return next();
  req.flash('error', 'Access denied. Admins only.');
  res.redirect('/');
};

module.exports = { isAuth, isAdmin };
