import express from 'express';
const router = express.Router();
import * as testController from '../controllers/test.Controller.js';


router.get('/test', testController.test)

export default router;
