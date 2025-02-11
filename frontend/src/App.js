import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, reviewsRes] = await Promise.all([
          fetch("https://polyglot-8iil.onrender.com/mysql/products"),
          fetch("https://polyglot-8iil.onrender.com/reviews"),
        ]);

        if (!productsRes.ok || !reviewsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const productsData = await productsRes.json();
        const reviewsData = await reviewsRes.json();

        if (!Array.isArray(productsData) || !Array.isArray(reviewsData)) {
          throw new Error("Invalid response format");
        }

        setProducts(productsData);
        setReviews(reviewsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Products & Reviews</h1>

      {loading && <p className="text-center text-secondary">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-warning">No products available.</p>
      )}

      <div className="row">
        {products.map((product) => {
          const productReviews = reviews.filter((r) => r.product_id === product.id);

          return (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">{product.description || "No description available"}</p>
                  <p className="card-text">
                    <strong>Price:</strong> ₹{product.price}
                  </p>
                  <p className={`card-text ${product.stock > 0 ? "text-success" : "text-danger"}`}>
                    <strong>Stock:</strong> {product.stock > 0 ? product.stock : "Out of stock"}
                  </p>

                  <h6>Reviews:</h6>
                  <ul className="list-group">
                    {productReviews.length > 0 ? (
                      productReviews.map((review) => (
                        <li key={review.id} className="list-group-item">
                          <strong>{review.user_name}:</strong> {review.review_text || "No review text"} <br />
                          <span className="text-warning">{review.rating ? "⭐".repeat(review.rating) : "No rating"}</span>
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item text-muted">No reviews yet</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
