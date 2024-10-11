// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Route Imports
const userRoutes = require('./routes/users');
const membershipRoutes = require('./routes/memberships');
const scheduleRoutes = require('./routes/schedules');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/schedules', scheduleRoutes);

// Basic Health Check Route
app.get('/', (req, res) => {
    res.send('Welcome to the Gym Management API');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
