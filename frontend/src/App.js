import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch("https://polyglot-8iil.onrender.com/reviews/product/${product_id}")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Ensure JSON response
      })
      .then((data) => {
        console.log("Fetched Products:", data);
        setProducts(data);
        setLoading(false); // Data fetched, stop loading
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false); // Stop loading on error
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>

      {loading && <p>Loading products...</p>} {/* Show loading message */}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>No products available.</p> // Handle empty product list
      )}

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name || "Unnamed Product"}</h2>
            <p>{product.description || "No description available"}</p>
            <p>Price: ₹{product.price ?? "N/A"}</p>
            <p>Stock: {product.stock > 0 ? product.stock : "Out of stock"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
