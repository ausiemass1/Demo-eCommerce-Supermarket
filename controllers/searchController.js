const searchModel = require('../models/searchModel')
const conn = require('../config/dbConfig')

// exports.searchProduct = async (req,res)=>{
//     const searchTerm = req.query.search || "";
//     const resultsPerPage = 3;
   
//     const results = await searchModel.searchProduct(searchTerm)
//       const numOfResults = results.length;
//       const numOfPages = Math.ceil(numOfResults / resultsPerPage);
//       const page = req.query.page ? Number(req.query.page) : 1;
  
//       if (page > numOfPages) {
//         res.redirect("/?page=" + encodeURIComponent(numOfPages));
//       } else if (page < 1) {
//         res.redirect("/?page=" + encodeURIComponent("1"));
//       }
  
//       const startingLimit = (page - 1) * resultsPerPage;
//       sql = `SELECT * FROM products LIMIT ${startingLimit}, ${resultsPerPage}`;
  
//     await conn.query(sql);
//         let iterator = page - 5 < 1 ? 1 : page - 5;
//         let endingLink =
//           iterator + 9 <= numOfPages ? iterator + 9 : page + (numOfPages - page);
//         res.render("user/products", {
//           results: results,
//           page,
//           numOfPages,
//           iterator,
//           endingLink,
//           searchTerm,
//         });

// }

// exports.searchProduct = async (req,res)=>{
//   const searchQuery = req.body.search || req.query.search || '';
//   const sql = 'SELECT * FROM products WHERE keywords LIKE ?';
//  await conn.query(sql, [`%${searchQuery}%`], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Database query failed.');
//     }
//     res.render('user/products', {results});
//   });

// }





// exports.searchProduct = async (req, res) => {
//   const searchTerm = req.query.search || "";

//   const sql = "SELECT * FROM products WHERE description LIKE ? OR keywords LIKE ?";
  
//   try {
  
//     const results = await conn.query(sql, [`%${searchTerm}%`, `%${searchTerm}%`]);

    
//     res.render("user/products", { results });
//   } catch (err) {
   
//     console.error("Error executing query:", err);
//     res.status(500).send("Error while searching products.");
//   }
// };