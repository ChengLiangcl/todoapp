export const isRequired = (value, inputs) => {
  return value.trim() !== '';
};
export const isValidEmail = (value, inputs) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const isStrongPassword = (value, inputs) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    value
  );

export const passwordsMatch = (confirmPassword, inputs) =>
  confirmPassword === inputs.password?.value;
