// middleware/auth.js
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware
    }
    res.redirect('/login'); // Redirect to login if not authenticated
}

function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next(); // User is admin, proceed
    }
    res.status(403).send('Forbidden: You do not have access to this page.'); // If not admin, send error
}

module.exports = { isAuthenticated, isAdmin };
// middleware/authorizeAdmin.js

const User = require('../models/User');

const authorizeAdmin = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (user && user.role === 'admin') {
        next(); // Allow access if user is admin
    } else {
        res.status(403).json({ message: 'Access denied, admin only' });
    }
};

module.exports = authorizeAdmin;
