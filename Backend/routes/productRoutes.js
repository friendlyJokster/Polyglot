const express = require('express');
const { mysqlConnection } = require('../Config/db');  // Ensure correct path
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Add a  new product
router.post('/products', [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('description').optional().isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, stock } = req.body;
    const query = 'INSERT INTO Products (name, description, price, stock) VALUES (?, ?, ?, ?)';

    mysqlConnection.query(query, [name, description || null, price, stock || 0], (err, result) => {
        if (err) {
            console.error('Error inserting product:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
    });
});

  

// ✅ Fetch all products
router.get('/products', (req, res) => {
    mysqlConnection.query('SELECT * FROM Products', (err, results) => {
        if (err) {
            console.error("MySQL Fetch Error:", err);  // Log the actual error
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


module.exports = router;
