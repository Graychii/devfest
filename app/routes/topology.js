const express = require('express');
const router = express.Router();
const { Topology } = require('../models/ISP_Client'); // Ensure the correct model is imported

// Route to create a new Topology
router.post('/add', async (req, res) => {
  const { router, max_bandwidth } = req.body; // No 'clients' field, just 'router'

  try {
    const newTopology = new Topology({ router, max_bandwidth });
    await newTopology.save(); // Save to database
    res.status(201).json({ message: 'Topology created successfully', topologyID: newTopology._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all Topologies
router.get('/', async (req, res) => {
  try {
    const topologies = await Topology.find().populate('router'); // Fetch all topologies and populate the 'router' field with ISP_Client data
    res.json(topologies); // Return the list of topologies
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
