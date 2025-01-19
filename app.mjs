import express from 'express';
import session from 'express-session';
import fileUpload from 'express-fileupload';
import flash from 'connect-flash';
import dotenv from 'dotenv';
dotenv.config();

import usersRoutes from './routes/usersRoutes.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import logoutRoutes from './routes/logoutRoutes.js';
import forgotPasswordRoutes from './routes/forgotPasswordRoutes.js';
import { flashMessages, cartDetails, username } from './middlewares/flashMessages.js';
import searchRoutes from './routes/searchRoutes.js';
import testRoutes from './routes/testRoutes.js';
import myAccountRoutes from './routes/myAccountRoutes.js';

import passport from 'passport';
import './config/passport.js'; // Import Passport configuration
import './config/dbConfig.js'
import conn from './config/dbConfig.js'; // Remove in production; only used for testing purposes

const app = express();


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
app.use(myAccountRoutes);

const PORT = 3000;
app.listen(3000, ()=>console.log(`app is running on port ${PORT}`))