const categoriesModel = require("../models/categoryModel");

exports.getCategories = async (req, res) => {
  try {
    const results = await categoriesModel.getCategories();
    res.render("admin/categories", { results });
  } catch (error) {
    console.log(error);
  }
};

exports.getInsertForm = (req, res) => {
  try {
    res.render("admin/categoryInsert");
  } catch (error) {
    console.log(error);
  }
};

exports.insertCategory = async (req, res) => {
  try {
    await categoriesModel.insertCategory(req.body.category_name);
    res.redirect('/admin/categories')
  } catch (error) {
    console.log('failed to add category');
  }
};

exports.editCategory = async (req, res) => {
  const catId = req.params.id;
  const results = await categoriesModel.editCategory(catId);
  res.render("admin/categoryEdit", { results: results[0] });
};

exports.updateCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    await categoriesModel.updateCategory(catId, req.body.category_name);
    res.redirect("/admin/categories");
  } catch (error) {
    console.log("Error updating category:", error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    await categoriesModel.deleteCategory(catId);
    res.redirect("/admin/categories");
  } catch (error) {
    console.log('Failed to delete category', error)
  }
};
