const conn = require("../config/dbConfig");

exports.addToCart = async (id) => {
  const sql = "SELECT * FROM products WHERE id = ?";
  const [rows] = await conn.execute(sql, [id]);
  return rows;
};

