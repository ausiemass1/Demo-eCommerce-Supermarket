import conn from '../config/dbConfig.js';
import * as userModel  from '../models/usersModel.js';
import bcrypt from 'bcrypt';


export const getAllUsers = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.render("admin/users", { users });
};

export const getUserRegForm = (req, res) => {
try{
  res.render("admin/register");
}catch(error){
  console.log(error)
}

};

export const registerUser = async (req, res) => {
  const { username, surname, phone, password, confirm_password, email } =
    req.body;

  let hash = await bcrypt.hash(password, 10);
  if (password === confirm_password) {
    const [rows] = await conn.execute(
      "INSERT INTO users(username,password,surname,phone,email) VALUES(?,?,?,?,?)",
      [username, hash, surname, phone, email]
    );

    res.send(
      `<script>alert("Data inserted successfully"); window.location.href = "/admin/users"; </script>`
    );
  } else {
    req.flash("error_msg", "Passwords do not match");
    res.redirect("/admin/register");
  }
};

export const getEditForm = async (req, res) => {
  try {
    const uid = req.params.id; // Get the user ID from the request params
    const results = await userModel.getEditForm(uid);
    res.render("admin/editUser", { users: results[0] }); // Pass the user data to the view
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).send("Error fetching user");
  }
};

export const updateUser = async (req, res) => {
  uid = req.params.id;
 const users = await userModel.updateUser(uid, req.body);
  res.redirect("/admin/users");
};

export const deleteUser = async (req, res) => {
  uid = req.params.id;
  const [rows] = await conn.query("DELETE FROM users WHERE id = ?", [uid]);
  res.redirect("/admin/users");
};
