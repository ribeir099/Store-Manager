const { productsService } = require('../services');
const { mapError } = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const { message } = await productsService.findAll();

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.findById(id);

  if (type) {
    return res.status(mapError(type)).json({ message });
  }

  res.status(200).json(message);
};

const create = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productsService.insert(name);

  if (type) {
    return res.status(mapError(type)).json({ message });
  }

  res.status(201).json(message);
}; 

module.exports = {
  getAll,
  getById,
  create,
};