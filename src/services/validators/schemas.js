const Joi = require('joi');

const nameSchema = Joi.string().min(5).required().label('name');
const saleSchema = Joi.array().items(Joi.object({
  productId: Joi.number().integer().required().label('productId'),
  quantity: Joi.number().integer().min(1).required()
    .label('quantity'),
}));

module.exports = {
  nameSchema,
  saleSchema,
};