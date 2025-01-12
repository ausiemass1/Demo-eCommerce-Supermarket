import express from 'express';
const router = express.Router();
import * as  myAccountController from '../controllers/myAccountController.js';

router.get('/admin/myAccount', myAccountController.myAccount);

export default router