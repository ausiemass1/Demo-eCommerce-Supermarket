const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.get('/admin/brand',  brandController.getBrands);
router.get('/admin/editbrand/:id', brandController.editBrand)
router.post('/admin/edit_brand/:id', brandController.updateBrand)
router.get('/admin/deletebrand/:id', brandController.deleteBrand)
router.get('/admin/insertbrand',  brandController.insertBrandForm)
router.post('/admin/insertbrand', brandController.insertBrand)

module.exports = router;