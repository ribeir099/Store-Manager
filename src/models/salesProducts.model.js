const connection = require('../db/connection');

const insert = async (productId, saleId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products 
    (product_id, sale_id, quantity)
    VALUES (?, ?, ?)`;
  const [{ insertId }] = await connection
    .execute(query, [productId, saleId, quantity]);

  return insertId;
};

module.exports = {
  insert,
};