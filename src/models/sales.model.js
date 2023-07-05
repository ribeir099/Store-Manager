const camelize = require('camelize');
const connection = require('../db/connection');

const insert = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.execute(query);

  return insertId;
};

const findAll = async () => {
  const query = `
  SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
  FROM sales AS s
  INNER JOIN sales_products AS sp
  ON s.id = sp.sale_id`;

  const [result] = await connection.execute(
    query,
  );
  return camelize(result);
};

const findById = async (id) => {
  const query = `
  SELECT s.date, sp.product_id, sp.quantity
  FROM sales AS s
  INNER JOIN sales_products AS sp
  ON s.id = sp.sale_id
  WHERE s.id = ?`;
  
  const [result] = await connection.execute(query, [id]);

  return camelize(result);
};

module.exports = {
  insert,
  findAll,
  findById,
};