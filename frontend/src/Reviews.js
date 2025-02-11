const handleSubmit = async (e) => {
  e.preventDefault();

  if (!newReview.user_name || !newReview.rating || !newReview.review_text) {
    setError("All fields are required.");
    return;
  }

  try {
    const response = await axios.post("https://polyglot-8iil.onrender.com/reviews", {
      product_id: productId,
      ...newReview,
    });

    // Optimistic Update: Add the review to the state immediately
    setReviews([...reviews, { id: Date.now(), product_id: productId, ...newReview }]);

    setNewReview({ user_name: "", rating: 5, review_text: "" });
    setError("");
  } catch (error) {
    console.error("Error adding review:", error);
    setError("Failed to add review.");
  }
};
