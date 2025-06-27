// Backend Test Submission/app.js

const express = require('express');
const app = express();
const path = require('path');

// Custom logger middleware
const logger = require('./middleware/logger');

// Routes
const shortenerRoutes = require('./routes/shortener');

// Middleware
app.use(express.json());
app.use(logger);

// API Routes
app.use('/', shortenerRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
