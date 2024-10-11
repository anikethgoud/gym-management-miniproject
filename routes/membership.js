// routes/memberships.js

const express = require('express');
const router = express.Router();
const Membership = require('../models/Membership');

// Fetch all memberships
router.get('/', async (req, res) => {
    try {
        const memberships = await Membership.find();
        res.json(memberships);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching memberships' });
    }
});

// Add a new membership
router.post('/', async (req, res) => {
    const { type, price, duration } = req.body;

    try {
        const newMembership = new Membership({ type, price, duration });
        await newMembership.save();
        res.status(201).json({ message: 'Membership added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding membership' });
    }
});

// Delete a membership
router.delete('/:id', async (req, res) => {
    try {
        await Membership.findByIdAndDelete(req.params.id);
        res.json({ message: 'Membership deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting membership' });
    }
});

module.exports = router;
