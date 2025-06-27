// Backend Test Submission/utils/generator.js

const { customAlphabet } = require('nanoid');

// Alphanumeric shortcodes (length 6)
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

module.exports = {
  generateCode: () => nanoid()
};
