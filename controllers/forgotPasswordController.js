import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import conn from '../config/dbConfig.js';
import * as  forgotPasswordModel  from '../models/forgotPasswordModel.js';

dotenv.config();


// Display the forgot password form
export const getforgotPasswordForm = (req, res) => {
  res.render("user/forgot_password");
};

// Handle forgot password form submission
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

const {rows, resetToken} = await forgotPasswordModel.forgotPassword(req.body.email)

  if (rows.affectedRows === 0) {
    return res.send("No account with that email found.");
  }

  // Send password reset email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const mailOptions = {
    from: "ausiemass@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `You requested a password reset. Click the link to reset your password: http://localhost:3000/reset_password/${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.error(error);
    req.flash("success_msg", "Password reset email sent!");
    res.redirect("/auth/login");
  });
};

// Display the reset password form
export const getResetpasswordForm = async (req, res) => {
  const { token } = req.params;

  // Check if the token is valid and not expired
  const query =
    "SELECT * FROM users WHERE reset_token = ? AND token_expiry > NOW()";
  const [results] = await conn.query(query, [token]);
// const results = await forgotPasswordModel.getResetpasswordForm(req.params);
  if (results.length === 0) {
    return res.send("Invalid or expired token.");
  }

  res.render("user/reset_password", { token });
};

// Handle reset password form submission
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  // Hash the new password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Update the user's password if the token is valid
  const query =
    "UPDATE users SET password = ?, reset_token = NULL, token_expiry = NULL WHERE reset_token = ? AND token_expiry > NOW()";
  const result = await conn.query(query, [hashedPassword, token]);
  if (result.affectedRows === 0) {
    return res.send("Invalid or expired token.");
  }
  req.flash("success_msg", "Password has been reset successfully!");
  res.redirect("/auth/login");
};
