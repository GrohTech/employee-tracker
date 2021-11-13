const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'wh4c:SFAL<3sql',
  database: 'employee_list'
});

module.exports = db;