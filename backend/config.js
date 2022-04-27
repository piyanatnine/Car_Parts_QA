const sql = require('mysql2/promise')

const passSQL = sql.createPool({
    host: process.env.SQL_HOSTNAME,
    user: 'root',
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = passSQL