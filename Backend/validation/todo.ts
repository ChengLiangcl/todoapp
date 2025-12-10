import Joi from 'joi';
// Schema: id, title, content, startDate, dueDate;
export const todoSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  startDate: Joi.date().required(),
  dueDate: Joi.date().required(),
}).unknown(false);

export const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  startDate: Joi.date().required(),
  dueDate: Joi.date().required(),
}).unknown(false);
