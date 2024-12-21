
import express  from 'express';
const router = express.Router();
import * as forgotPasswordController  from '../controllers/forgotPasswordController.js';

router.get('/forgot_password', forgotPasswordController.getforgotPasswordForm)
router.post('/forgot_password',forgotPasswordController.forgotPassword)
router.get('/reset_password/:token', forgotPasswordController.getResetpasswordForm)
router.post('/reset_password', forgotPasswordController.resetPassword)

export default router 




