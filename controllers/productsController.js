const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const conn = require("../config/dbConfig");
const productsModel = require("../models/productsModel");

exports.getAllProducts = async (req, res) => {
  try {
    const results = await productsModel.getAllProducts();
    res.render("user/products", { results });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllProductForAdmin = async (req, res) => {
  try {
    const results = await productsModel.getAllProducts();
    res.render("admin/productsAll", { results });
  } catch (error) {
    console.log(error);
  }
};

exports.getProductForm = async (req, res) => {
  const { brand, category } = await productsModel.getProductForm();
  console.log(brand);
  res.render("admin/productInsert", { brand, category });
};

exports.editProduct = async (req, res) => {
  const results = await productsModel.editProduct(req.params.id);
  console.log(results[0]);
  res.render("admin/productEdit", { results: results[0] });
};

exports.updateProduct = async (req, res) => {
  const pid = req.params.id;
  const { product_name, description, keywords, category_id, brand_id, price } =
    req.body;
  let image;
  image = req.files.image;
  let imageName = `${Date.now()}-${image.name}`;
  let uploadpath;

  uploadpath = path.join(__dirname, "../public/uploads/products/", imageName);
  image.mv(uploadpath, (err) => {
    if (err) throw err;
  });

  const sql =
    "UPDATE products SET product_name = ?, description = ?, keywords = ?, category_id = ?, brand_id = ?, price = ?, image = ? WHERE id = ? ";
  await conn.query(sql, [
    product_name,
    description,
    keywords,
    category_id,
    brand_id,
    price,
    imageName,
    pid,
  ]);

  req.flash("success_msg", "Product updated Successfuly");

  res.redirect("/admin/products");
};

exports.deleteProduct = async (req, res) => {
  const prodId = req.params.id;
  await productsModel.deleteProduct(prodId);
  res.redirect("/admin/products");
};

exports.insertproduct = async (req, res) => {
  const { product_name, description, keywords, category_id, brand_id, price } =
    req.body;

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
