const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'Aristea123?',
  database: 'maxikiosco'
});

module.exports = db;
