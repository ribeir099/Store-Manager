const { salesModel } = require('../models');

const insert = async () => {
  const insertId = await salesModel.insert();

  return { type: null, message: { id: insertId } };
};

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  if (sale.length === 0) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: sale };
};

module.exports = {
  insert,
  findAll,
  findById,
};