const { salesProductsServices } = require('../services');
const { mapError } = require('../utils/errorMap');

const create = async (req, res) => {
  const object = req.body;

  const { type, message } = await salesProductsServices.insert(object);

  if (type) {
    return res.status(mapError(type)).json({ message });
  }

  res.status(201).json(message);
};

module.exports = {
  create,
};