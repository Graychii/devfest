const mongoose = require('mongoose');

// Define the Topology schema
const TopologySchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generated ID
  server: { type: Number, default: 1 }, // Always 1
  router: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ISP_Client' }], // Array of references to ISP_Client
  max_bandwidth: { type: Number, required: true }, // Maximum bandwidth
});

// Define the Bandwidth schema
const BandwidthSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generated ID
  mir: { type: Number, required: true }, // Minimum Information Rate
  cir: { type: Number, required: true }, // Committed Information Rate
  bandwidth_limit: { type: Number, required: true }, // Bandwidth limit
});

// Define the Network_Status schema
const NetworkStatusSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generated ID
  clientID: { type: mongoose.Schema.Types.ObjectId, ref: 'ISP_Client' }, // Reference to ISP_Client
  interface_speed: { type: Number, required: true }, // Interface speed
  timestamp: { type: Date, default: Date.now }, // Timestamp
});

// Define the ISP schema
const ISPSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generated ID
  topology: { type: mongoose.Schema.Types.ObjectId, ref: 'Topology' }, // Reference to Topology
});

// Define the Manager schema with an array of ISP_Clients
const ManagerSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generated ID
  time_interval: { type: Number, required: true }, // Time interval in seconds
  isp_clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ISP_Client' }], // Array of references to ISP_Client
});

// Define the ISP_Client schema
const ISP_Client_Schema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generated ID
  requests: { type: Number, required: true }, // Number of requests
  allocated_bandwidth: { type: Number, required: true }, // Allocated bandwidth
  network_speed: { type: Number, required: true }, // Network speed
  bandwidth: { type: mongoose.Schema.Types.ObjectId, ref: 'Bandwidth', required: true }, // Reference to Bandwidth schema
  network_status: [NetworkStatusSchema], // Array of Network Status objects
  isp: { type: mongoose.Schema.Types.ObjectId, ref: 'ISP' }, // Reference to ISP schema
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' }, // Reference to Manager schema
});

// Create models for each schema
const ISP_Client = mongoose.model('ISP_Client', ISP_Client_Schema);
const Manager = mongoose.model('Manager', ManagerSchema);
const Bandwidth = mongoose.model('Bandwidth', BandwidthSchema);
const NetworkStatus = mongoose.model('Network_Status', NetworkStatusSchema);
const ISP = mongoose.model('ISP', ISPSchema);
const Topology = mongoose.model('Topology', TopologySchema);

// Export all models
module.exports = {
  ISP_Client,
  Manager,
  Bandwidth,
  NetworkStatus,
  ISP,
  Topology,
};
