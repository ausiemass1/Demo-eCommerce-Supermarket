const mysql = require('mysql2/promise');


const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webclass5'
})


module.exports = conn;