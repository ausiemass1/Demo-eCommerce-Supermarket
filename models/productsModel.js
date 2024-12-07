const conn = require("../config/dbConfig");
// view all the products
exports.getAllProducts = async () => {
  const sql = "SELECT * FROM products";
  const [rows] = await conn.execute(sql);
  return rows;
};
//insert product to database
exports.insertproduct = async (user) => {

 
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
exports.editProduct = async (id)=>{
  const prodId = id;
  
  const sql= "SELECT * FROM products WHERE id = ? ";
  console.log(prodId)
  const [rows] = await conn.execute(sql,[prodId]);
  console.log(rows)
  return rows;
}

exports.deleteProduct = async (id) => {
  const sql = "DELETE FROM products WHERE id= ?";
  const [rows] = await conn.execute(sql,[id]);
  return rows;
}

exports.getProductForm = async ()=>{
  const [brand] = await conn.query("SELECT * FROM brands");
  const [category] =  await conn.query("SELECT * FROM categories");
  return {brand, category};
}

//pagination logic


// Fetch paginated products
exports.getPaginatedProducts = async (limit, offset) => {
  const sql = 'SELECT * FROM products LIMIT ? OFFSET ?';
  const [rows] = await conn.query(sql, [limit, offset]); // Destructure rows from the query result
  return rows; // Return the fetched rows
};

// Fetch total product count
exports.getTotalProductCount = async () => {
  const sql = 'SELECT COUNT(*) AS total FROM products';
  const [[{ total }]] = await conn.query(sql); // Destructure total from the nested query result
  return total; // Return the total count
};

