import conn  from "../config/dbConfig.js";
// view all the products
export const getAllProducts = async () => {
  // const sql = "SELECT * FROM products";
  const sql = `
  SELECT 
    products.id, 
    products.product_name, 
    products.image, 
    products.description, 
    products.keywords, 
    products.stock,
    products.price, 
    categories.category_name, 
    brands.brand_name
  FROM 
    products
  LEFT JOIN 
    categories ON products.category_id = categories.category_id
  LEFT JOIN 
    brands ON products.brand_id = brands.brand_id
`;
  const [rows] = await conn.execute(sql);
  return rows;
};
//insert product to database
export const insertproduct = async (user) => {

 
  const {
    product_name,
    description ,
    keywords ,
    price,
    stock,
    brand_id,
    category_id,
    image,
  } = user;
 
  const sql =
    "INSERT INTO products(product_name,description,keywords,price,stock,brand_id,category_id,image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    try {

     
        const [rows] = await conn.query(sql, [product_name,
          description,
          keywords,
          price,
          stock,
          brand_id,
          category_id,
          image]);
        return rows;
      } catch (error) {
        console.error("Database Error:", error.message);
        throw error;
      }
};

// get edit form
export const editProduct = async (id)=>{
  const prodId = id;
  
  const sql= "SELECT * FROM products WHERE id = ? ";
  console.log(prodId)
  const [rows] = await conn.execute(sql,[prodId]);
  console.log(rows)
  return rows;
}

export const deleteProduct = async (id) => {
  const sql = "DELETE FROM products WHERE id= ?";
  const [rows] = await conn.execute(sql,[id]);
  return rows;
}

export const getProductForm = async ()=>{
  const [brand] = await conn.query("SELECT * FROM brands");
  const [category] =  await conn.query("SELECT * FROM categories");
  return {brand, category};
}


// Fetch paginated products with optional search
export const getPaginatedProducts = async (limit, offset, searchTerm = "") => {
  const searchCondition = `%${searchTerm}%`;
  const sql = `
    SELECT * FROM products 
    WHERE description LIKE ? OR keywords LIKE ? OR product_name LIKE ?
    LIMIT ? OFFSET ?
  `;
  const [rows] = await conn.query(sql, [searchCondition, searchCondition,searchCondition, limit, offset]);
  return rows; // Return the fetched rows
};

// Fetch total product count with optional search
export const getTotalProductCount = async (searchTerm = "") => {
  const searchCondition = `%${searchTerm}%`;
  const sql = `
    SELECT COUNT(*) AS total 
    FROM products 
    WHERE description LIKE ? OR keywords LIKE ? OR product_name LIKE ?
  `;
  const [[{ total }]] = await conn.query(sql, [searchCondition, searchCondition, searchCondition,]);
  return total; // Return the total count
};

