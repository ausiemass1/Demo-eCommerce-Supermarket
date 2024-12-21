import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();


router.post('/auth/', authController.login)
router.get('/auth/login', authController.loginForm)
router.get('/auth/register', authController.registerForm)
router.get('/auth/google',authController.googleAuth)
router.get('/auth/google/callback', authController.googleCallback)
router.get('/auth/github',authController.githubAuth)
router.get('/auth/github/callback', authController.githubCallback)
// router.get('/auth/admin/dashboard', authController.admi)

export default router;