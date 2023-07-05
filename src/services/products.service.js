const { productsModel } = require('../models');

const schema = require('./validators/validateInputsValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: product };
};

const insert = async (name) => {
  const error = schema.validateName(name);
  
  if (error.type) {
    return error;
  }

  const insertId = await productsModel.insert(name);

  return { type: null, message: { id: insertId, name } };
};

module.exports = {
  findAll,
  findById,
  insert,
};