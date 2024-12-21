import express from 'express';
const router = express.Router();
import * as  homeController from '../controllers/homeController.js';


router.get('/', homeController.home);
router.get('/admin/dashboard', homeController.adminDashboard);

export default router


