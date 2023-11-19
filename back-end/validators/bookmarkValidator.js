function isValidUrl(url) {
  // regular expression pattern for URL validation
  const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)*$/i;

  return urlRegex.test(url);
}

module.exports = {isValidUrl}