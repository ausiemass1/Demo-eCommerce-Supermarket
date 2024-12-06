const conn = require("../config/dbConfig");

exports.getAllUsers = async () => {
  try {
    const [rows] = await conn.query("SELECT * FROM users"); // Destructure rows from the query result
    return rows; // Return the rows directly
  } catch (error) {
    console.error("Error in getAllUsers:", error.message);
    throw error; // Re-throw the error to be handled in the controller
  }
};

exports.updateUser = async (id, user) => {
  try {
    const { username, surname, phone, email } = user;
    const [rows] = await conn.query(
      "UPDATE users SET username = ?, surname=?, phone=?, email=? WHERE id =?",
      [username, surname, phone, email, id]
    );
    return rows;
  } catch (error) {
    console.error("Error in updateuser:", error.message);
    throw error;
  }
};

exports.getEditForm = async (id) => {
  try {
    const [rows] = await conn.query("SELECT * FROM users WHERE id = ?", [id]); // Await the query
    return rows;
  } catch (error) {
    console.error("Error in getEditForm:", error.message);
    throw error;
  }
};
