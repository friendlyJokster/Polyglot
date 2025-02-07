const mysql = require('mysql2');
const mongoose = require('mongoose');
require('dotenv').config();

// MySQL Connection
// const mysqlConnection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DB
// });

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nithin@98',  // Update your MySQL password
  database: 'my_database',  // Ensure this is the correct database name
  multipleStatements: true
});


mysqlConnection.connect(err => {
  if (err) {
    console.error('❌ MySQL Connection Failed:', err);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

// MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('✅ Connected to MongoDB'))
//     .catch((err) => console.error('MongoDB Connection Error:', err));


module.exports = { mysqlConnection };
