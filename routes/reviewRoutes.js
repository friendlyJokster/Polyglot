const express = require('express');
const { mysqlConnection } = require('../Config/db'); // Ensure MySQL is imported correctly
const router = express.Router();

// Add a new review (MySQL)
router.post('/', (req, res) => {
  const { product_id, review_text } = req.body;
  
  if (!product_id || !review_text) {
    return res.status(400).json({ error: "Missing required fields: product_id, review_text" });
  }

  const query = 'INSERT INTO reviews (product_id, review_text) VALUES (?, ?)';  // Ensure lowercase `reviews`
  
  mysqlConnection.query(query, [product_id, review_text], (err, results) => {
    if (err) {
      console.error("❌ MySQL Insert Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: '✅ Review added successfully', reviewId: results.insertId });
  });
});

// Get all reviews
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Reviews';  // Ensure lowercase `reviews`

  mysqlConnection.query(query, (err, results) => {
    if (err) {
      console.error("❌ MySQL Fetch Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;
