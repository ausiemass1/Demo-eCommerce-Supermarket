import express from 'express';
const router = express.Router();
import * as  productController from '../controllers/productsController.js';
import * as  homeController from '../controllers/homeController.js';
import * as  isAuthenticated from '../middlewares/authMiddleware.js';

router.get('/user/products', productController.getAllProducts);
router.get('/admin/products', productController.getAllProductForAdmin);
router.get('/admin/insertProduct', productController.getProductForm);
router.post('/admin/insertProduct', productController.insertproduct);
router.get('/admin/editproduct/:id', productController.editProduct);
router.post('/admin/updateproduct/:id', productController.updateProduct);
router.get('/admin/deleteproduct/:id',productController.deleteProduct);

export default router