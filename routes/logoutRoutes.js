import express from 'express';
const router = express.Router();
import * as logoutController from '../controllers/logoutController.js'

router.get('/logout', logoutController.logout)
export default router;