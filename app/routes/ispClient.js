const express = require('express');
const router = express.Router();
const { ISP_Client } = require('../models/ISP_Client'); // Ensure the path is correct

// Route to add ISP Client
router.post('/add', async (req, res) => {
  const { requests, allocated_bandwidth, network_speed, bandwidth, isp } = req.body;

  try {
    const newISPClient = new ISP_Client({
      requests,
      allocated_bandwidth,
      network_speed,
      bandwidth, // Include bandwidth field
      isp // Include isp field
    });

    await newISPClient.save(); // Save to database
    res.status(201).json({ message: 'ISP Client created successfully', clientID: newISPClient._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all ISP Clients
router.get('/', async (req, res) => {
  try {
    const ispClients = await ISP_Client.find()
      .populate('bandwidth') // Optional: Populate bandwidth details
      .populate('isp'); // Optional: Populate ISP details

    res.json(ispClients); // Return the list of ISP clients
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get ISP Client by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const ispClient = await ISP_Client.findById(id)
      .populate('bandwidth') // Optional: Populate bandwidth details
      .populate('isp'); // Optional: Populate ISP details

    if (!ispClient) {
      return res.status(404).json({ message: 'ISP Client not found' });
    }

    res.json(ispClient); // Return the ISP client
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
