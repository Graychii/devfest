const express = require('express');
const router = express.Router();
const { Topology } = require('../models/ISP_Client'); // Ensure correct models are imported

// Route to create a new Topology
router.post('/add', async (req, res) => {
  const { routers, max_bandwidth } = req.body; // 'routers' is now an array of router objects

  try {
    // Check that routers are provided in the correct format
    if (!Array.isArray(routers) || routers.length === 0) {
      return res.status(400).json({ error: 'Routers should be a non-empty array' });
    }

    const newTopology = new Topology({ routers, max_bandwidth }); // Create a new Topology with embedded routers
    await newTopology.save(); // Save to the database
    res.status(201).json({ message: 'Topology created successfully', topologyID: newTopology._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all Topologies
router.get('/', async (req, res) => {
  try {
    const topologies = await Topology.find(); // Fetch all topologies

    // The routers and clients are already populated because they are embedded
    res.json(topologies); // Return the list of topologies with routers and clients included
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
