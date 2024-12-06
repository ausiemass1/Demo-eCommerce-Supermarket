const express = require('express')
const router = express.Router()
 const categoryController = require('../controllers/categoryController')

router.get('/admin/categories', categoryController.getCategories);
router.get('/admin/insertCategories', categoryController.getInsertForm)
router.post('/admin/insertCategories', categoryController.insertCategory)
router.get('/admin/editcategory/:id', categoryController.editCategory)
router.post('/admin/editcategory/:id', categoryController.updateCategory)
router.get('/admin/deletecategory/:id', categoryController.deleteCategory)

module.exports = router;