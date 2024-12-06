const crypto = require("crypto");
const forgotPasswordController = require("../controllers/forgotPasswordController");
const conn = require("../config/dbConfig");

exports.forgotPassword = async (email) => {
  // Generate a unique token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1-hour expiry
  const query =
    "UPDATE users SET reset_token = ?, token_expiry = ? WHERE email = ?";
  const [rows] = await conn.query(query, [resetToken, tokenExpiry, email]);
  return { rows, resetToken };
};

exports.getResetpasswordForm = async (id)=>{

}
