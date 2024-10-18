require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const authRoutes = require('./routes/auth'); // Ensure this route exists
const topologyRoutes = require('./routes/topology');
const bandwidthRoutes = require('./routes/bandwidth');
const networkStatusRoutes = require('./routes/networkStatus');
const ispRoutes = require('./routes/isp');
const managerRoutes = require('./routes/manager');
const ispClientRoutes = require('./routes/ispClient');

require('./config/passport-setup'); // Ensure this is imported

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up session middleware
app.use(session({
  secret: 'shitkey', // Use a strong secret key for production
  resave: false,
  saveUninitialized: false,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use('/topology', topologyRoutes);
app.use('/bandwidth', bandwidthRoutes);
app.use('/network-status', networkStatusRoutes);
app.use('/isp', ispRoutes);
app.use('/manager', managerRoutes);
app.use('/isp-client', ispClientRoutes);
app.use('/auth', authRoutes); // Authentication routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
