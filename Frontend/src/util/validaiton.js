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

export const validateDateComparison = (value, inputs, compareField) => {
  const compareValue = inputs[compareField]?.value;
  if (!value || !compareValue) return true;

  const currentDate = new Date(value);
  const otherDate = new Date(compareValue);

  if (isNaN(currentDate.getTime()) || isNaN(otherDate.getTime())) return true;

  if (compareField === 'dueDate') {
    // current field is startDate, compare with dueDate
    return currentDate <= otherDate;
  } else if (compareField === 'startDate') {
    // current field is dueDate, compare with startDate
    return currentDate >= otherDate;
  }

  return true;
};
