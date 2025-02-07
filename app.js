const express = require('express');
const { mysqlConnection } = require('./Config/db');
const bodyParser = require('body-parser');
const reviewRoutes = require('./routes/reviewRoutes');
require('dotenv').config();
const morgan = require('morgan');



const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
//app.use(express.json());

// MySQL Route - Fetch Products
// app.get('/mysql/products', (req, res) => {
//   mysqlConnection.query('SELECT * FROM products', (err, results) => {
//     if (err) {
//       console.error("MySQL Products Error:", err); // Log error
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(results);
//   });
// });

const productRoutes = require('./routes/productRoutes');  // Ensure correct path
app.use('/mysql', productRoutes);  // This means your endpoint will be /mysql/products


// Use MySQL Review Routes (Fixed Path)
app.use('/reviews', reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
