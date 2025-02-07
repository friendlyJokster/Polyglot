const db = require('../Config/db'); // Import MySQL connection

const Review = {
    addReview: async (productId, reviewText) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO reviews (product_id, review_text) VALUES (?, ?)";
            db.query(sql, [productId, reviewText], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    getAllReviews: async () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM reviews";
            db.query(sql, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

module.exports = Review;
