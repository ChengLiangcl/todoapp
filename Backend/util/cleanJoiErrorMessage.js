module.exports = cleanJoiErrorMessage = (rawMsg) => {
  return rawMsg.replace(/\\?"([^"]+)"\\?/g, '$1');
};
