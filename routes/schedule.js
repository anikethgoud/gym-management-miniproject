// routes/schedules.js

const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// Fetch all classes
router.get('/', async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedules' });
    }
});

// Book a class (could implement your own booking logic here)
router.post('/book-class', async (req, res) => {
    // This example assumes you simply record the booking without persisting it in a new model
    const { className, trainer, time } = req.body;
    // Logic for booking (this can be extended)
    res.json({ message: `Class ${className} booked with trainer ${trainer} at ${time}` });
});

// Add a new class schedule
router.post('/', async (req, res) => {
    const { className, trainer, time, duration } = req.body;

    try {
        const newClass = new Schedule({ className, trainer, time, duration });
        await newClass.save();
        res.status(201).json({ message: 'Class schedule added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding class schedule' });
    }
});

// Delete a class schedule
router.delete('/:id', async (req, res) => {
    try {
        await Schedule.findByIdAndDelete(req.params.id);
        res.json({ message: 'Class schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting class schedule' });
    }
});

module.exports = router;
