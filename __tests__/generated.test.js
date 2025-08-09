const Unknown = require('./Unknown');

describe('Invalid User Inputs Test', () => {
  it('should handle invalid user inputs correctly', () => {
    // Test case 1: Invalid input type
    expect(() => Unknown.handleUserInput(null)).toThrow();

    // Test case 2: Invalid input value
    expect(() => Unknown.handleUserInput('')).toThrow();
    expect(() => Unknown.handleUserInput(undefined)).toThrow();
    expect(() => Unknown.handleUserInput(123)).toThrow();
    expect(() => Unknown.handleUserInput([])).toThrow();
    expect(() => Unknown.handleUserInput({})).toThrow();
  });
});