



// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session && req.session.loggedin) {
      return next(); // Proceed to the next middleware or route handler
    }
    res.redirect("/auth/login"); // Redirect to login if not authenticated
  }
  
  module.exports = { isAuthenticated };
  