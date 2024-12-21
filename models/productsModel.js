import conn  from "../config/dbConfig.js";
// view all the products
export const getAllProducts = async () => {
  const sql = "SELECT * FROM products";
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

// Fetch paginated products
export const getPaginatedProducts = async (limit, offset) => {
  const sql = 'SELECT * FROM products LIMIT ? OFFSET ?';
  const [rows] = await conn.query(sql, [limit, offset]); // Destructure rows from the query result
  return rows; // Return the fetched rows
};

// Fetch total product count
export const getTotalProductCount = async () => {
  const sql = 'SELECT COUNT(*) AS total FROM products';
  const [[{ total }]] = await conn.query(sql); // Destructure total from the nested query result
  return total; // Return the total count
};

