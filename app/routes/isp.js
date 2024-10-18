// routes/isp.js
const express = require('express');
const router = express.Router();
const { ISP } = require('../models/ISP_Client'); // Import the ISP model

// Route to create a new ISP
router.post('/add', async (req, res) => {
  const { topology } = req.body;

  try {
    const newISP = new ISP({ topology });
    await newISP.save(); // Save to database
    res.status(201).json({ message: 'ISP created successfully', ispID: newISP._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all ISPs
router.get('/', async (req, res) => {
  try {
    const isps = await ISP.find() // Fetch all ISPs
      .populate('topology'); // Optional: Populate topology details

    res.json(isps); // Return the list of ISPs
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
