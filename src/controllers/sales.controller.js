const { salesServices } = require('../services');
const { mapError } = require('../utils/errorMap');

const create = async (_req, res) => {
  const { message } = await salesServices.insert();

  res.status(201).json(message);
};

const getAll = async (_req, res) => {
  const { message } = await salesServices.findAll();

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesServices.findById(id);

  if (type) {
    return res.status(mapError(type)).json({ message });
  }

  res.status(200).json(message);
};

module.exports = {
  create,
  getAll,
  getById,
};