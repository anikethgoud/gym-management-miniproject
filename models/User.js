// models/User.js

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    membership: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Membership', // Reference to Membership model
    },
}, { timestamps: true });

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
