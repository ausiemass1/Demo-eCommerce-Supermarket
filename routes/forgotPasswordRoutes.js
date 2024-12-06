
const express = require('express')
const router = express.Router();
const forgotPasswordController = require('../controllers/forgotPasswordController')

router.get('/forgot_password', forgotPasswordController.getforgotPasswordForm)
router.post('/forgot_password',forgotPasswordController.forgotPassword)
router.get('/reset_password/:token', forgotPasswordController.getResetpasswordForm)
router.post('/reset_password', forgotPasswordController.resetPassword)

module.exports = router;




