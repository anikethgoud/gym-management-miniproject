const express = require('express');
const router = express.Router();
const User = require('../models/User');

// User Registration
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Simple validation
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match.');
  }

  // Check if user already exists
  User.findOne({ email }, (err, existingUser) => {
    if (existingUser) {
      return res.status(400).send('User already exists.');
    }

    const newUser = new User({ name, email, password });
    newUser.save(err => {
      if (err) {
        return res.status(500).send('Error registering user.');
      }
      res.redirect('/login');
    });
  });
});

// User Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (!user || user.password !== password) {
      return res.status(400).send('Invalid credentials.');
    }

    // Create a session
    req.session.userId = user._id; // Save user ID in session
    res.redirect('/profile.html');
  });
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out.');
    }
    res.redirect('/login.html');
  });
});

module.exports = router;
// routes/auth.js
const express = require('express');
//const router = express.Router();
const authenticate = require('../middleware/auth');

router.get('/check', authenticate, (req, res) => {
    res.status(200).json({ message: 'User is authenticated' });
});

module.exports = router;

