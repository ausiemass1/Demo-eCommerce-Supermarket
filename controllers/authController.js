const express = require('express')

const conn = require('../config/dbConfig')
const bcrypt = require('bcrypt');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const authModel = require('../models/authModel')

exports.loginForm = (req, res)=>{
    res.render('user/login');
};

exports.registerForm = (req,res)=>{
    res.render('user/register')
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
        const results = await authModel.login(req.body) ;
  
      if (results.length > 0) {
        const user = results[0];
  
        // Compare the hashed password
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          // Set user session and redirect to the appropriate view
          req.session.loggedin = true;
          req.session.username = user.name;
  
          if (user.user_type == 1) {
            req.flash("success_msg", "Successfully logged in!");
            return res.redirect("/admin/dashboard");
          } else {
            req.flash("success_msg", "Successfully logged in!");
            return res.redirect("/admin/brand");
          }
        } else {
          // Incorrect password
          req.flash("error_msg", "Invalid credentials! Try again");
          return res.redirect("/auth/login");
        }
      } else {
        // User not found
        req.flash("error_msg", "User not found");
        return res.redirect("/auth/login");
      }
    } catch (err) {
      console.error("Error during login process:", err);
      return res.status(500).send("An internal server error occurred");
    }
  };

//get the google login page

exports.googleAuth =  passport.authenticate('google', { scope: ['profile', 'email'] });

 exports.googleCallback =  passport.authenticate('google', {
    successRedirect: '/admin/brand',
    failureRedirect: '/auth/login',
  });


  exports.githubAuth =  passport.authenticate('github', { scope: ['profile', 'email'] });

 exports.githubCallback =  passport.authenticate('github', {
    successRedirect: '/admin/brand',
    failureRedirect: '/auth/login',
  });







 
  