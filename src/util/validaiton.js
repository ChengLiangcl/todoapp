export const isRequired = (value, inputs) => {
  return value.trim() !== '';
};
export const isValidEmail = (value, inputs) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const isStrongPassword = (value, inputs) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    value
  );

export const passwordsMatch = (confirmPassword, inputs) => {
  return confirmPassword === inputs.password?.value;
};

export const validateStartAndEndDate = (startDate, endDate) => {
  if (!startDate || !endDate) return false;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const isSameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  if (isSameDay) return false;
  return start < end;
};
