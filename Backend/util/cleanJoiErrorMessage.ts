export const cleanJoiErrorMessage = (rawMsg) => {
  return rawMsg.replace(/\\?"([^"]+)"\\?/g, '$1');
};
