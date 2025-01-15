
import express from 'express';
const router = express.Router()
import * as userController from '../controllers/userController.js';

router.get('/admin/users', userController.getAllUsers);
router.get('/admin/register', userController.getUserRegForm);
router.post("/users/register", userController.registerUser);
router.get('/admin/edit/:id', userController.getEditForm)
router.post('/admin/update/:id', userController.updateUser)
router.get('/admin/delete/:id', userController.deleteUser)
// router.post('/users/register', userController.getUserRegForm)

export default router