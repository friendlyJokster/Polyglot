import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://polyglot-8iil.onrender.com/mysql/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Ensure JSON response
      })
      .then((data) => {
        console.log("Fetched Products:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description || "No description available"}</p>
            <p>Price: ₹{product.price}</p>
            <p>Stock: {product.stock > 0 ? product.stock : "Out of stock"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
