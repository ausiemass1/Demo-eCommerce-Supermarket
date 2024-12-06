const express = require('express');
const app = express();
const session = require('express-session');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');
const nodemailer = require('nodemailer'); //used in contact routes, to be removed
const bcrypt = require('bcrypt'); //used in auth routes , to be removed
const axios = require('axios') // used in paypal, to be removed
const dotenv = require('dotenv').config();
const usersRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const productsRoutes = require('./routes/productsRoutes');
const homeRoutes = require('./routes/homeRoutes');
const cartRoutes = require('./routes/cartRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require('./routes/brandRoutes')
const logoutRoutes = require('./routes/logoutRoutes')
const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes')
const {flashMessages, cartDetails, username } = require('./middlewares/flashMessages');
const searchRoutes = require('./routes/searchRoutes')
const testRoutes = require('./routes/testRoutes');
const passport = require('passport');
require('./config/passport'); // Import Passport configuration

const conn = require('./config/dbConfig'); // to be removed  in production. only used for tesing purposes

//Session variables
const SESSION_SECRET = process.env.SESSION_SECRET;

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(flash());
app.use(fileUpload());
//==================session========================//
app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(passport.initialize());
app.use(passport.session());

//==========middlewares defined in the middleware folder==========//
app.use(flashMessages);
app.use(cartDetails);
app.use(username);

//===========Routes==============//
app.use(homeRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use(contactRoutes);
app.use(cartRoutes);
app.use(brandRoutes);
app.use(categoryRoutes);
app.use(usersRoutes);
app.use(logoutRoutes);
app.use(forgotPasswordRoutes);
app.use(searchRoutes);
app.use(testRoutes);

const PORT = 3000;
app.listen(3000, ()=>console.log(`app is running on port ${PORT}`))