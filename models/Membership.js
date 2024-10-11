// models/Membership.js

const mongoose = require('mongoose');

// Define the Membership schema
const membershipSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: String, // E.g., "1 Month", "3 Months", etc.
        required: true,
    },
}, { timestamps: true });

// Create and export the Membership model
module.exports = mongoose.model('Membership', membershipSchema);
