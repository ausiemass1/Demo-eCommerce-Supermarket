
const conn = require('../config/dbConfig');

exports.login = async (user)=>{
    const { username, password } = user;
    const sql = "SELECT * FROM users WHERE username = ?";
    const [rows] = await conn.execute(sql, [username]);
    return rows
}


// Find a user by Google ID
exports.findByGoogleId = async (googleId) => {
    const query = "SELECT * FROM google_users WHERE google_id = ?";
    const [results] = await conn.query(query, [googleId]);
    return results[0]; // Return the first result or undefined
  };
  
  // Find a user by ID
  exports.findById = async (id) => {
    const query = "SELECT * FROM google_users WHERE id = ?";
    const [results] = await conn.query(query, [id]);
    return results[0];
  };
  
  // Insert a new Google user
  exports.insertUser = async (user) => {
    const query = "INSERT INTO google_users SET ?";
    const [result] = await conn.query(query, user);
    return result.insertId; // Return the new user's ID
  };



  exports.findByGithubId = async (githubId) => {
    const query = "SELECT * FROM google_users WHERE google_id = ?";
    const [results] = await conn.query(query, [githubId]);
    return results[0]; // Return the user if found
  };

  exports.insertUser = async (user) => {
    const query = "INSERT INTO google_users SET ?";
    const [result] = await conn.query(query, user);
    return result.insertId; // Return the new user's ID
  };
  
  