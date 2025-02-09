const express = require('express');
const { mysqlConnection } = require('../Config/db'); // Ensure MySQL is imported correctly
const router = express.Router();

// Add a new review (MySQL)
router.post('/', (req, res) => {
  const { product_id, user_name, rating, review_text } = req.body;

  // Validate required fields
  if (!product_id || !user_name || !rating || !review_text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Validate rating is between 1 and 5
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  const query = 'INSERT INTO Reviews (product_id, user_name, rating, review_text) VALUES (?, ?, ?, ?)';
  
  mysqlConnection.query(query, [product_id, user_name, rating, review_text], (err, results) => {
    if (err) {
      console.error("MySQL Insert Error:", err); // Log error
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Review added successfully', reviewId: results.insertId });
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
