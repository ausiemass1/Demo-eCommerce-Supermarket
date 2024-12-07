const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController')
const homeController = require('../controllers/homeController')
const {isAuthenticated} = require('../middlewares/authMiddleware')

router.get('/user/products', productController.getAllProducts)
router.get('/admin/products', productController.getAllProductForAdmin)
router.get('/admin/insertProduct', productController.getProductForm)
router.post('/admin/insertProduct', productController.insertproduct)
router.get('/admin/editproduct/:id', productController.editProduct)
router.post('/admin/updateproduct/:id', productController.updateProduct)
router.get('/admin/deleteproduct/:id',productController.deleteProduct)

module.exports = router;