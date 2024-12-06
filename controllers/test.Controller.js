
const conn = require('../config/dbConfig')



exports.test = async (req,res)=>{
    res.render('user/paymentOptions');
}