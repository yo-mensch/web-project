function isValidEmail(email) {
  // regular expression pattern for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

module.exports = { isValidEmail };
