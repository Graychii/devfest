// routes/networkStatus.js
const express = require('express');
const router = express.Router();
const { ISP_Client, NetworkStatus } = require('../models/ISP_Client'); // Ensure the correct models are used

// Route to create a new Network Status
router.post('/add', async (req, res) => {
    const { clientID, interface_speed } = req.body; // Ensure clientID is being sent correctly

    try {
        // Create the new Network Status document
        const newNetworkStatus = new NetworkStatus({
            clientID, // Reference to the ISP Client
            interface_speed,
        });

        await newNetworkStatus.save(); // Save to database

        // Optionally, update the ISP_Client to push the new status into the network_status array
        await ISP_Client.updateOne(
            { _id: clientID },
            { $push: { network_status: newNetworkStatus } }
        );

        res.status(201).json({ message: 'Network Status created successfully', statusID: newNetworkStatus._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get all Network Statuses
router.get('/', async (req, res) => {
    try {
        const networkStatuses = await NetworkStatus.find().populate('clientID'); // Populate clientID to get full ISP_Client details
        res.json(networkStatuses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
