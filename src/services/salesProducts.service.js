const { salesModel, salesProductsModel, productsModel } = require('../models');
const schema = require('./validators/validateInputsValues');

const insert = async (object) => {  
  const error = schema.validateNewSale(object);

  if (error.type) {
    return error;
  }

  const errors = await Promise.all(object.map(async (product) => {
    const search = await productsModel.findById(product.productId);
    if (!search) return 'ERROR';
    return null;
  }));

  if (errors.find((type) => type === 'ERROR')) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }

  const saleId = await salesModel.insert();

  await Promise.all(object.map(async (product) => {
    await salesProductsModel.insert(product.productId, saleId, product.quantity);
  }));

  return { type: null, message: { id: saleId, itemsSold: object } };
};

module.exports = {
  insert,
};