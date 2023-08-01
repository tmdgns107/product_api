const mysql = require('mysql2/promise');
const dbConfig = require('./dbConfig.json');

const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

module.exports = connection;
