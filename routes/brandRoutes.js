import express from 'express';
import * as brandController from '../controllers/brandController.js';
import * as  isAuthenticated  from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/admin/brand',  brandController.getBrands);
router.get('/admin/editbrand/:id', brandController.editBrand)
router.post('/admin/edit_brand/:id', brandController.updateBrand)
router.get('/admin/deletebrand/:id', brandController.deleteBrand)
router.get('/admin/insertbrand',  brandController.insertBrandForm)
router.post('/admin/insertbrand', brandController.insertBrand)

export default router