// routes/admin.js
const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth'); // Import authentication middleware

// Admin Dashboard Route
router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin.html')); // Serve admin.html
});

module.exports = router;
