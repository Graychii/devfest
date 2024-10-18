// routes/bandwidth.js
const express = require('express');
const router = express.Router();
const { Bandwidth } = require('../models/ISP_Client'); // Import the Bandwidth model

// Route to create a new Bandwidth
router.post('/add', async (req, res) => {
  const { mir, cir, bandwidth_limit } = req.body;

  try {
    const newBandwidth = new Bandwidth({ mir, cir, bandwidth_limit });
    await newBandwidth.save(); // Save to database
    res.status(201).json({ message: 'Bandwidth created successfully', bandwidthID: newBandwidth._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all Bandwidth records
router.get('/', async (req, res) => {
  try {
    const bandwidths = await Bandwidth.find(); // Fetch all Bandwidth records
    res.json(bandwidths); // Return the list of Bandwidth records
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
