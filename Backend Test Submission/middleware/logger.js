// Logging Middleware/logger.js

const fs = require('fs');
const path = require('path');

// Basic middleware to log method and URL to a file
function logger(req, res, next) {
  const time = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;

  const logLine = `${time} - ${method} ${url}\n`;

  const logFile = path.join(__dirname, '../access.log');
  fs.appendFile(logFile, logLine, (err) => {
    if (err) {
      console.error('Failed to write log:', err);
    }
  });

  next();
}

module.exports = logger;
