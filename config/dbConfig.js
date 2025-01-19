import mysql from 'mysql2/promise';


// Create the connection pool using environment variables
const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webclass5',
});

export default conn;
