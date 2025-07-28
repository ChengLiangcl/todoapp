const Joi = require('joi');

exports.loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
}).unknown(false);

exports.registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(9).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  email: Joi.string().email().required(),
  role: Joi.string(),
}).unknown(false);
