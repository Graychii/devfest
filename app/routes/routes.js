// routes/routes.js
const express = require('express');
const router = express.Router();
const { NetworkStatus } = require('../models/ISP_Client'); // Import the NetworkStatus model

// Route to add a new Network Status
router.post('/add', async (req, res) => {
  const { clientID, interface_speed } = req.body;

  try {
    // Create a new Network Status instance
    const newNetworkStatus = new NetworkStatus({
      clientID, // Reference to ISP_Client
      interface_speed, // Interface speed
    });

    // Save to the database
    await newNetworkStatus.save();
    res.status(201).json({ message: 'Network Status added successfully', newNetworkStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
