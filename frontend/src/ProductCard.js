import React from "react";
import Reviews from "./Reviews"; // Import the Reviews component

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.description || "No description available"}</p>
      <p className="text-green-500 font-bold">₹{product.price}</p>
      <p className={product.stock > 0 ? "text-blue-500" : "text-red-500"}>
        {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
      </p>

      {/* Add the Reviews Component Below */}
      <Reviews productId={product.id} />
    </div>
  );
};

export default ProductCard;
