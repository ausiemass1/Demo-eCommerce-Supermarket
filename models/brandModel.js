import conn from "../config/dbConfig.js";

export const getBrands = async () => {
  try {
    const sql = "SELECT * FROM brands";
    const [rows] = await conn.execute(sql);
    return rows;
  } catch (error) {
    console.log("failed to get brands", error);
  }
};

export const insertBrand = async (brand) => {
  try {
    const sql = "INSERT INTO brands(brand_name) VALUES(?)";
    const [rows] = await conn.execute(sql,[brand]);
    return rows;
  } catch (error) {
    console.log("Failed to insert brand: " ,error);
  }
};

export const editBrand = async (id) => {
  const brandId = id;
  const sql = "SELECT * FROM brands WHERE brand_id = ?";
  const [rows] = await conn.execute(sql, [brandId]);
  return rows;
};

export const updateBrand = async (id, brand) => {
  const brandId = id;
  const brand_name = brand;

  const sql = "UPDATE brands SET brand_name = ? WHERE brand_id = ? ";
  const [rows] = await conn.query(sql, [brand_name, brandId]);
  return rows;
};

export const deleteBrand = async (id) => {
  const sql = "DELETE FROM brands WHERE brand_id = ?";
  const [rows] = await conn.execute(sql, [id]);
  return rows;
};

