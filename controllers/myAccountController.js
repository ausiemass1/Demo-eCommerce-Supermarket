import conn from "../config/dbConfig.js";

export const getPagenation = async (req, res) => {
  
  const searchTerm = req.query.search || "";
  const resultsPerPage = 3;
  const [results] = await conn.query("SELECT * FROM products");
  const numOfResults = results.length;
  const numOfPages = Math.ceil(numOfResults / resultsPerPage);
  const page = req.query.page ? Number(req.query.page) : 1;

  if (page > numOfPages) {
    res.redirect("/?page=" + encodeURIComponent(numOfPages));
  } else if (page < 1) {
    res.redirect("/?page=" + encodeURIComponent("1"));
  }

  const startingLimit = (page - 1) * resultsPerPage;
  sql = `SELECT * FROM products LIMIT ${startingLimit}, ${resultsPerPage}`;

  await conn.query(sql);
  let iterator = page - 5 < 1 ? 1 : page - 5;
  let endingLink =
    iterator + 9 <= numOfPages ? iterator + 9 : page + (numOfPages - page);
  res.render("user/products", {
    results: results,
    page,
    numOfPages,
    iterator,
    endingLink,
    searchTerm,
  });
};

export const adminDashboard = async (req, res) => {
  // Pass the product ratings and weekly sales data to the EJS template
  res.render("admin/dashboard");
};

export const myAccount = async (req, res) => {
  
const user = req.session.username
  const sql = "SELECT * FROM users where username = ?";
  const [results] = await conn.query(sql, [user]);
  
  res.render("admin/myAccount", { results: results[0] });
  console.log(results)
};
