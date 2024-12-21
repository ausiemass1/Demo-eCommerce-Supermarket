import crypto  from "crypto";
import * as forgotPasswordController from "../controllers/forgotPasswordController.js";
import conn from "../config/dbConfig.js";

export const forgotPassword = async (email) => {
  // Generate a unique token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1-hour expiry
  const query =
    "UPDATE users SET reset_token = ?, token_expiry = ? WHERE email = ?";
  const [rows] = await conn.query(query, [resetToken, tokenExpiry, email]);
  return { rows, resetToken };
};

export const getResetpasswordForm = async (id)=>{

}
