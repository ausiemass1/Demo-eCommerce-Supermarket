const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/cart', cartController.cart);
router.post('/add-to-cart/:id', cartController.addToCart)
router.get('/remove-from-cart/:id', cartController.removeFromCart)
//=====================paypal processing=====================//
router.get('/payment', cartController.payment)
router.post('/pay', cartController.confirmPayment)
router.get('/success',cartController.paypalSuccess);
router.get('/cancel', cartController.paypalCancel)
//=====================Google Pay processing=====================//
router.get('/process-payment', cartController.processGooglepay)

module.exports = router;