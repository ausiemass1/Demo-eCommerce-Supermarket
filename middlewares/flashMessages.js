
export function flashMessages(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
}
export function cartDetails(req, res, next) {
  const cart = req.session.cart || [];
  const cartCount = cart.length;
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  res.locals.cart = cart;
  res.locals.cartCount = cartCount;
  res.locals.totalPrice = totalPrice;

  next();
}
export function username(req, res, next) {
  res.locals.username = req.session.username;
  next();
}

export function UserId(req, res, next) {
  res.locals.UserId = req.session.UserId;
  next();
}

