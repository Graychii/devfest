const mongoose = require('mongoose');

// Define the Client schema
const ClientSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generated ID
  requests: { type: Number, required: true }, // Number of requests
  allocated_bandwidth: { type: Number, required: true }, // Allocated bandwidth
  network_speed: { type: Number, required: true }, // Network speed
  bandwidth: { type: mongoose.Schema.Types.ObjectId, ref: 'Bandwidth', required: true }, // Reference to Bandwidth schema
  network_status: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Network_Status' }], // Array of Network Status references
});

// Define the Router schema
const RouterSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generated ID
  clients: [ClientSchema], // Array of embedded clients
});

// Define the Topology schema
const TopologySchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generated ID
  routers: [RouterSchema], // Array of routers (each representing a server with clients)
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
  clientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }, // Reference to Client
  interface_speed: { type: Number, required: true }, // Interface speed
  timestamp: { type: Date, default: Date.now }, // Timestamp
});

// Define the Manager schema with an array of Clients
const ManagerSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generated ID
  time_interval: { type: Number, required: true }, // Time interval in seconds
  clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }], // Array of Client references
});

// Create models for each schema
const Client = mongoose.model('Client', ClientSchema);
const Router = mongoose.model('Router', RouterSchema);
const Topology = mongoose.model('Topology', TopologySchema);
const Bandwidth = mongoose.model('Bandwidth', BandwidthSchema);
const NetworkStatus = mongoose.model('Network_Status', NetworkStatusSchema);
const Manager = mongoose.model('Manager', ManagerSchema);

// Export all models
module.exports = {
  Client,
  Router,
  Topology,
  Bandwidth,
  NetworkStatus,
  Manager,
};
