const connection = require('../db/connection');

const findAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(
    query,
  );
  return result;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE products.id = ?';
  const [[result]] = await connection.execute(query, [id]);

  return result;
};

const insert = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};