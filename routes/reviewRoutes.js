const express = require('express');
const { mysqlConnection } = require('../Config/db'); // Ensure MySQL is imported correctly
const router = express.Router();

// Add a new review (MySQL)
router.post('/', (req, res) => {
  const { product_id, review_text } = req.body;
  if (!product_id || !review_text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = 'INSERT INTO Reviews (product_id, review_text) VALUES (?, ?)';
  mysqlConnection.query(query, [product_id, review_text], (err, results) => {
    if (err) {
      console.error("MySQL Insert Error:", err); // Log error
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Review added successfully', reviewId: results.insertId });
  });
});

// Get all reviews
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM Reviews', (err, results) => {
    if (err) {
      console.error("MySQL Fetch Error:", err); // Log error
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});




module.exports = router;
