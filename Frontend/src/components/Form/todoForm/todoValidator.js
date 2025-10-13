const todoValidator = {
  title: (value, _) => (value?.length === 0 ? 'Title is required' : ''),
  content: (value, _) => (value?.length === 0 ? 'content is required' : ''),
  startDate: (value, inputs) => {
    const date = new Date(value);
    const currentDate = new Date();
    if (value === '') return 'Start date is required';
    if (date < currentDate) return 'Start date cannot be in the past';
    const endDate = new Date(inputs.dueDate);
    if (date === endDate) return 'Start date cannot be equal to end date';
    return '';
  },
  dueDate: (value, inputs) => {
    if (value === '') return 'End date is required';
    const date = new Date(value);
    const startDate = new Date(inputs.startDate);
    if (date < startDate) return 'End date cannot be before start date';
    return '';
  },
};

export default todoValidator;
