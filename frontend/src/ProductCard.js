import React from "react";
import Reviews from "./Reviews"; // Import the Reviews component

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-green-500 font-bold">${product.price}</p>

      {/* Add the Reviews Component Below */}
      <Reviews productId={product.id} />
    </div>
  );
};

export default ProductCard;
