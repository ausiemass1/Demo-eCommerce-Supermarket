import * as categoriesModel from '../models/categoryModel.js';

export const getCategories = async (req, res) => {
  try {
    const results = await categoriesModel.getCategories();
    res.render("admin/categories", { results });
  } catch (error) {
    console.log(error);
  }
};

export const getInsertForm = (req, res) => {
  try {
    res.render("admin/categoryInsert");
  } catch (error) {
    console.log(error);
  }
};

export const insertCategory = async (req, res) => {
  try {
    await categoriesModel.insertCategory(req.body.category_name);
    res.redirect('/admin/categories')
  } catch (error) {
    console.log('failed to add category');
  }
};

export const editCategory = async (req, res) => {
  const catId = req.params.id;
  const results = await categoriesModel.editCategory(catId);
  res.render("admin/categoryEdit", { results: results[0] });
};

export const updateCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    await categoriesModel.updateCategory(catId, req.body.category_name);
    res.redirect("/admin/categories");
  } catch (error) {
    console.log("Error updating category:", error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    await categoriesModel.deleteCategory(catId);
    res.redirect("/admin/categories");
  } catch (error) {
    console.log('Failed to delete category', error)
  }
};
