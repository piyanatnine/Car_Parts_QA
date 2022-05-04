const sql = require('mysql2/promise')

const passSQL = sql.createPool({
    host: process.env.NODE_APP_SQL_HOSTNAME,
    user: 'root',
    password: process.env.NODE_APP_SQL_PASSWORD,
    database: process.env.NODE_APP_SQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = passSQL