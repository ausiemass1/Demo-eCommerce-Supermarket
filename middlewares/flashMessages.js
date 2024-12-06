
module.exports = {
    //make flash messages available to all templates
    flashMessages: (req, res, next) =>{
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
      },
// make cart, cartCount totalPrice vailable to all views
      cartDetails: (req, res, next) => {
        const cart = req.session.cart || [];
        const cartCount = cart.length;
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    
        res.locals.cart = cart;
        res.locals.cartCount = cartCount;
        res.locals.totalPrice = totalPrice;
    
        next();
    },

    //make username available to all views
    username: (req, res, next) => {
        res.locals.username = req.session.username;
        next();
      },
}

