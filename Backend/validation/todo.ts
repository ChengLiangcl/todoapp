const Joi = require('joi');

// Schema: id, title, content, startDate, dueDate;
exports.todoSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  startDate: Joi.date().required(),
  dueDate: Joi.date().required(),
}).unknown(false);

exports.createTodoSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  startDate: Joi.date().required(),
  dueDate: Joi.date().required(),
}).unknown(false);
