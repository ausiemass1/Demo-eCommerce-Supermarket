import express from 'express';
const router = express.Router();
import * as  categoryController  from '../controllers/categoryController.js';

router.get('/admin/categories', categoryController.getCategories);
router.get('/admin/insertCategories', categoryController.getInsertForm)
router.post('/admin/insertCategories', categoryController.insertCategory)
router.get('/admin/editcategory/:id', categoryController.editCategory)
router.post('/admin/editcategory/:id', categoryController.updateCategory)
router.get('/admin/deletecategory/:id', categoryController.deleteCategory)

export default router;