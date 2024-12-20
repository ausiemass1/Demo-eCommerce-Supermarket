const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config();
const cartModel = require('../models/cartModel')




//paypal payment
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

exports.cart = async (req, res) => {
  const cart = req.session.cart || [];
  const cartCount = req.session.cart ? req.session.cart.length : 0;
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  res.render("user/cart", { cart, totalPrice, cartCount });

};
//====================Add to Cart===============//
exports.addToCart = async (req, res) => {
  const productId = req.params.id;
  const quantity = parseInt(req.body.quantity);

  const results = await cartModel.addToCart(productId);

  const product = results[0];
  if (product) {
    req.session.cart = req.session.cart || [];
    const existingProductIndex = req.session.cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex > -1) {
      // If the product is already in the cart, update the quantity
      req.session.cart[existingProductIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add it
      req.session.cart.push({ ...product, quantity });
    }
    res.redirect("/");
   
  }
};

exports.payment =  (req,res)=>{
  res.render('user/payment');
}

exports.removeFromCart = (req, res) => {
  const productId = parseInt(req.params.id);
  req.session.cart = req.session.cart.filter((item) => item.id !== productId);
  req.flash("error_msg", "product removed from cart successfully!");
  res.redirect("/cart");
}

//=====================paypal processing=====================//
// PayPal payment route
exports.confirmPayment = async (req, res) => {
  const cart = req.session.cart || [];
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  try {
      // Step 1: Create the order with experience context
      const orderResponse = await axios.post(
          "https://api.sandbox.paypal.com/v2/checkout/orders",
          {
              intent: "CAPTURE",
              purchase_units: [
                  {
                      amount: {
                          currency_code: "USD",
                          value: totalPrice.toFixed(2).toString(),
                      },
                      description: "Shopping Cart Total",
                  },
              ],
              application_context: {
                  brand_name: "Demo supermarket",
                  locale: "en-US",
                  landing_page: "BILLING", // Can be "LOGIN" or "BILLING"
                  shipping_preference: "NO_SHIPPING", // "GET_FROM_FILE", "NO_SHIPPING", or "SET_PROVIDED_ADDRESS"
                  user_action: "PAY_NOW", // Shows a "Pay Now" button instead of "Continue"
                  return_url: "http://localhost:3000/success",
                  cancel_url: "http://localhost:3000/cancel",
              },
          },
          {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${await getAccessToken()}`,
              },
          }
      );

      // Redirect to PayPal approval URL
      const approvalUrl = orderResponse.data.links.find(
          (link) => link.rel === "approve"
      ).href;
      res.redirect(approvalUrl);
  } catch (error) {
      console.error("PayPal order creation error:", error);
      res.status(500).send("Error creating PayPal order");
  }
};

//capture paypal payment
exports.paypalSuccess = async (req, res) => {
  const token = req.query.token;

  try {
      // Step 2: Capture the order
      const captureResponse = await axios.post(
          `https://api.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
          {},
          {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${await getAccessToken()}`,
              },
          }
      );

      // Handle successful payment
      req.session.cart = [];
      req.flash('success_msg', "Payment successful");
      res.redirect('/cart');
  } catch (error) {
      console.error("Order capture error:", error);
      res.status(500).send("Error capturing PayPal order");
  }
}
// Cancel route
exports.paypalCancel = async (req, res) => {
  req.flash('error_msg', "Payment Cancelled!");
  res.redirect('/payment');
};

// Function to get PayPal access token
async function getAccessToken() {
  const response = await axios.post(
      "https://api.sandbox.paypal.com/v1/oauth2/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
          auth: {
              username: PAYPAL_CLIENT_ID,
              password: PAYPAL_CLIENT_SECRET,
          },
          headers: {
              Accept: "application/json",
              "Accept-Language": "en_US",
          },
      }
  );

  return response.data.access_token;
}

//=====================Google pay=====================//

exports.processGooglepay = async (req, res) => {
  const paymentData = req.body;
  
  console.log('Payment Data Received:', paymentData);

  req.session.cart = [];
  req.flash('success_msg', "Payment successful");
  res.redirect('/cart');
  // res.status(200).json({ status: 'success', message: 'Payment processed for testing!' });
};