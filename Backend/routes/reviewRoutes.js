const express = require('express');
const { mysqlConnection } = require('../Config/db'); // Ensure MySQL is imported correctly
const router = express.Router();

// Add a new review (MySQL)
router.post('/', (req, res) => {
  const { product_id, user_name, rating, review_text } = req.body;

  // Validate required fields
  if (!product_id || !user_name || !rating || !review_text) {
    return res.status(400).json({ error: "All fields (product_id, user_name, rating, review_text) are required." });
  }

  // Validate rating is between 1 and 5
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5." });
  }

  // Check if the product exists before adding a review
  const checkProductQuery = 'SELECT id FROM Products WHERE id = ?';
  mysqlConnection.query(checkProductQuery, [product_id], (err, results) => {
    if (err) {
      console.error("MySQL Product Check Error:", err);
      return res.status(500).json({ error: "Database error while checking product existence." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found. Cannot add review to a non-existent product." });
    }

    // Insert the review if the product exists
    const insertQuery = 'INSERT INTO Reviews (product_id, user_name, rating, review_text) VALUES (?, ?, ?, ?)';
    mysqlConnection.query(insertQuery, [product_id, user_name, rating, review_text], (err, results) => {
      if (err) {
        console.error("MySQL Insert Error:", err);
        return res.status(500).json({ error: "Database error while inserting review." });
      }
      res.status(201).json({ message: 'Review added successfully', reviewId: results.insertId });
    });
  });
});



// Get paginated reviews for a product
router.get('/:product_id/reviews', (req, res) => {
  const { product_id } = req.params;
  const page = parseInt(req.query.page) || 1; // Default page = 1
  const limit = parseInt(req.query.limit) || 10; // Default limit = 10
  const offset = (page - 1) * limit;

  const query = `SELECT * FROM Reviews WHERE product_id = ? LIMIT ${limit} OFFSET ${offset}`;

  mysqlConnection.query(query, [product_id], (err, results) => {
    if (err) {
      console.error("❌ MySQL Fetch Error:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json({ page, limit, reviews: results });
  });
});

module.exports = router;

