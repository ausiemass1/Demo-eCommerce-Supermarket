
import conn from '../config/dbConfig.js';



export async function test(req,res){
    res.render('user/test.ejs');
}