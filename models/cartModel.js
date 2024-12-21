import conn from "../config/dbConfig.js";

export const addToCart = async (id) => {
  const sql = "SELECT * FROM products WHERE id = ?";
  const [rows] = await conn.execute(sql, [id]);
  return rows;
};

