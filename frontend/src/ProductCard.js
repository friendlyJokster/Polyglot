import React from "react";

function ProductCard({ name, description, price, stock }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h2>{name}</h2>
      <p>{description ? description : "No description available"}</p>
      <p>Price: ₹{price}</p>
      <p style={{ color: stock > 0 ? "green" : "red" }}>
        {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
      </p>
    </div>
  );
}

export default ProductCard;
