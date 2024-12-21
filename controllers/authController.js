import express from "express";
import conn from "../config/dbConfig.js";
import bcrypt from "bcrypt";
import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as authModel from "../models/authModel.js";

dotenv.config();

export const loginForm = (req, res) => {
  res.render("user/login");
};

export const registerForm = (req, res) => {
  res.render("user/register");
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await authModel.login(req.body);

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

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = passport.authenticate("google", {
  successRedirect: "/admin/brand",
  failureRedirect: "/auth/login",
});

export const githubAuth = passport.authenticate("github", {
  scope: ["profile", "email"],
});

export const githubCallback = passport.authenticate("github", {
  successRedirect: "/admin/brand",
  failureRedirect: "/auth/login",
});
