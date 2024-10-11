// models/Schedule.js

const mongoose = require('mongoose');

// Define the Schedule schema
const scheduleSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
    },
    trainer: {
        type: String,
        required: true,
    },
    time: {
        type: String, // E.g., "10:00 AM"
        required: true,
    },
    duration: {
        type: String, // E.g., "1 Hour"
        required: true,
    },
}, { timestamps: true });

// Create and export the Schedule model
module.exports = mongoose.model('Schedule', scheduleSchema);
