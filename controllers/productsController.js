import path from 'path';
import { fileURLToPath } from 'url';
import conn from '../config/dbConfig.js';
import * as  productsModel  from '../models/productsModel.js';

// all the product for customer views
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1
    const limit = 8; // Number of products per page
    const offset = (page - 1) * limit; // Calculate offset for pagination

    const searchTerm = req.query.search || ""; // Get search term from query

    // Fetch paginated products and total product count using the model
    const results = await productsModel.getPaginatedProducts(limit, offset, searchTerm);
    const totalProducts = await productsModel.getTotalProductCount(searchTerm);

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limit);
    
    // Render the products page
    res.render("user/products", {
      results,
      currentPage: page,
      totalPages,
      searchTerm,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred while fetching products");
  }
};

// all the product for admin views, insert update and delete
export const getAllProductForAdmin = async (req, res) => {
  try {
    const results = await productsModel.getAllProducts();
    res.render("admin/productsAll", { results });
  } catch (error) {
    console.log(error);
  }
};

export const getProductForm = async (req, res) => {
  const { brand, category } = await productsModel.getProductForm();
  console.log(brand);
  res.render("admin/productInsert", { brand, category });
};

export const editProduct = async (req, res) => {
  const results = await productsModel.editProduct(req.params.id);
  const [categories] = await conn.query("SELECT * FROM categories"); 
  const [brands] = await conn.query("SELECT * FROM brands");
  res.render("admin/productEdit", { results: results[0], categories, brands});
};

export const updateProduct = async (req, res) => {
  const pid = req.params.id;
  const { product_name, description, keywords, category_id, brand_id, price } =
    req.body;

  let imageName = null;

  // Check if an image was uploaded
  if (req.files && req.files.image) {
  let image = req.files.image;
  let imageName = `${Date.now()}-${image.name}`;
  let uploadpath;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  uploadpath = path.join(__dirname, "../public/uploads/products/", imageName);
  image.mv(uploadpath, (err) => {
    if (err) throw err;
  });
  }

 // Construct the update query
 const updateFields = {
  product_name,
  description,
  keywords,
  category_id,
  brand_id,
  price,
};

// Add image to update fields if it exists
if (imageName) {
  updateFields.image = imageName;
}



  const sql =
    "UPDATE products SET ? WHERE id = ? ";
  await conn.query(sql, [
    updateFields,
    pid,
  ]);

  req.flash("success_msg", "Product updated Successfuly");

  res.redirect("/admin/products");
};

export const deleteProduct = async (req, res) => {
  const prodId = req.params.id;
  await productsModel.deleteProduct(prodId);
  res.redirect("/admin/products");
};

export const insertproduct = async (req, res) => {
  const { product_name, description, keywords, category_id, brand_id, price } =
    req.body;
    const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


  let image;
  let uploadpath;
  image = req.files.image;

  uploadpath = path.join(__dirname, "../public/uploads/products/", image.name);

  image.mv(uploadpath, (err) => {
    if (err) throw err;
  });

  // Prepare the product object
  const product = {
    product_name,
    description,
    keywords,
    category_id,
    brand_id,
    price,
    image: image.name, // Only save the file name in the database
  };

  // Insert the product into the database using the model
  await productsModel.insertproduct(product);

  req.flash("success_msg", "Product added Successfuly");

  res.redirect("/admin/insertproduct");
};

