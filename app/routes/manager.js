const express = require('express');
const router = express.Router();
const { Manager, ISP_Client } = require('../models/ISP_Client'); // Import both Manager and ISP_Client models

// Route to create a new Manager
router.post('/add', async (req, res) => {
  const { time_interval, isp_clients } = req.body; // Expect an array of ISP_Client IDs in isp_clients

  try {
    // Check if all provided ISP_Client IDs are valid
    const clients = await ISP_Client.find({ _id: { $in: isp_clients } });
    if (clients.length !== isp_clients.length) {
      return res.status(400).json({ error: 'One or more ISP clients not found' });
    }

    // Create new manager with an array of isp_clients
    const newManager = new Manager({ time_interval, isp_clients });
    await newManager.save(); // Save the manager to the database

    res.status(201).json({ message: 'Manager created successfully', managerID: newManager._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all Managers and populate the isp_clients field
router.get('/', async (req, res) => {
  try {
    const managers = await Manager.find()
      .populate('isp_clients'); // Populate the isp_clients field with client details

    res.json(managers); // Return the list of managers
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
