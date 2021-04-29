const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'qacar',
    waitForConnection: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;