const conn = require("../config/dbConfig");

exports.getCategories = async () => {
  try {
    const sql = "SELECT * FROM categories";
    const [rows] = await conn.execute(sql);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

exports.insertCategory = async (category) => {
    const sql = "INSERT INTO categories(category_name) VALUES(?)";
    const [rows] = await conn.execute(sql,[category])
    return rows;
};

exports.editCategory = async (id) => {
  const catId = id;
  const sql = "SELECT * FROM categories WHERE category_id = ?";
  const [rows] = await conn.execute(sql, [catId]);
  return rows;
};

exports.updateCategory = async (id, category) => {
  const category_name = category;
  const sql = "UPDATE categories SET category_name = ? WHERE category_id = ?";
  const [rows] = await conn.execute(sql, [category_name, id]);
  return rows;
};

exports.deleteCategory = async (id) => {
  const sql = "DELETE FROM categories WHERE category_id = ?";
  const [rows] = await conn.execute(sql, [id]);
  return rows;
};
