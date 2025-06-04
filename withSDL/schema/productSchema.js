const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(2).required(),
  price: Joi.number().positive().required(),
  categoryId: Joi.number().integer().required(),
});

module.exports = productSchema;
