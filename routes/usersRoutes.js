
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/admin/users', userController.getAllUsers);
router.get('/admin/register', userController.getUserRegForm);
router.post("/admin/register", userController.registerUser);
router.get('/admin/edit/:id', userController.getEditForm)
router.post('/admin/update/:id', userController.updateUser)
router.get('/admin/delete/:id', userController.deleteUser)

module.exports = router;