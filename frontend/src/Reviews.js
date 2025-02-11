import React, { useState, useEffect } from "react";
import axios from "axios";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user_name: "", rating: 5, review_text: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reviews/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newReview.user_name || !newReview.rating || !newReview.review_text) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reviews", {
        product_id: productId,
        ...newReview,
      });

      setNewReview({ user_name: "", rating: 5, review_text: "" });
      setError("");
      fetchReviews(); // Refresh reviews after submitting
    } catch (error) {
      console.error("Error adding review:", error);
      setError("Failed to add review.");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">Reviews</h2>

      {/* Display Reviews */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="p-2 border-b">
            <p className="font-semibold">{review.user_name}</p>
            <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
            <p>{review.review_text}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}

      {/* Add Review Form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 w-full rounded mb-2"
          value={newReview.user_name}
          onChange={(e) => setNewReview({ ...newReview, user_name: e.target.value })}
        />

        <select
          className="border p-2 w-full rounded mb-2"
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} Stars
            </option>
          ))}
        </select>

        <textarea
          placeholder="Your Review"
          className="border p-2 w-full rounded mb-2"
          value={newReview.review_text}
          onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Reviews;
