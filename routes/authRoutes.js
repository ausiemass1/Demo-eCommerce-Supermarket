const express = require('express');
const router =express.Router();
const authController = require('../controllers/authController')

router.post('/auth/', authController.login)
router.get('/auth/login', authController.loginForm)
router.get('/auth/register', authController.registerForm)
router.get('/auth/google',authController.googleAuth)
router.get('/auth/google/callback', authController.googleCallback)
router.get('/auth/github',authController.githubAuth)
router.get('/auth/github/callback', authController.githubCallback)
// router.get('/auth/admin/dashboard', authController.admi)

module.exports = router;