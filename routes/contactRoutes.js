import express from 'express';
const router = express.Router();
import * as  contactController from '../controllers/contactController.js';

router.get('/contact', contactController.contactForm);
router.post('/contact',contactController.sendMessage)


export default router
