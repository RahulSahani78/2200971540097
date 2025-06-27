// Backend Test Submission/routes/shortener.js

const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { generateCode } = require('../utils/generator');

/**
 * POST /shorturls
 * Create a short URL
 */
router.post('/shorturls', (req, res) => {
  const { url, shortcode, validity } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing URL' });
  }

  const code = shortcode || generateCode();

  if (!/^[a-zA-Z0-9]{4,12}$/.test(code)) {
    return res.status(400).json({ error: 'Shortcode must be alphanumeric and 4–12 characters long' });
  }

  if (store[code]) {
    return res.status(409).json({ error: 'Shortcode already exists' });
  }

  const validFor = Number.isInteger(validity) ? validity : 30;
  const expiresAt = Date.now() + validFor * 60 * 1000;

  store[code] = {
    url,
    createdAt: Date.now(),
    expiresAt,
    clicks: 0
  };

  return res.status(201).json({
    shortLink: `http://localhost:3000/${code}`,
    expiresAt: new Date(expiresAt).toISOString()
  });
});

/**
 * GET /:code
 * Redirect to the original URL if valid
 */
router.get('/:code', (req, res) => {
  const code = req.params.code;
  const entry = store[code];

  if (!entry) return res.status(404).json({ error: 'Shortcode not found' });
  if (Date.now() > entry.expiresAt) return res.status(410).json({ error: 'Short URL expired' });

  entry.clicks += 1;
  entry.lastAccessed = new Date();

  res.redirect(entry.url);
});

/**
 * GET /analytics/:code
 * Return statistics for a shortened URL
 */
router.get('/analytics/:code', (req, res) => {
  const code = req.params.code;
  const entry = store[code];

  if (!entry) return res.status(404).json({ error: 'Shortcode not found' });

  res.status(200).json({
    original_url: entry.url,
    created_at: new Date(entry.createdAt).toISOString(),
    expires_at: new Date(entry.expiresAt).toISOString(),
    clicks: entry.clicks,
    last_accessed: entry.lastAccessed || null
  });
});

module.exports = router;
