import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import formatPrice from "../utils/formatPrice";

const ProductDetail = () => {
  const { name } = useParams(); // 🔥 Name from URL
  const [searchParams] = useSearchParams(); // 🔥 Get ID from URL
  const productId = searchParams.get("id"); // 🔥 Extract ID

  const { product, fetchProductById, loading, error } =
    useContext(ProductContext);
  const { addItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [buttonText, setButtonText] = useState("Add to Cart");

  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    }
  }, [productId]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!product)
    return <div className="text-center py-8">Product not found</div>;

  const handleAddToCart = () => {
    addItem({
      id: product._id, // Değiştirildi: product.id yerine product._id
      name: product.name,
      price: product.price,
      quantity: quantity,
    });
    setButtonText("Added to Cart!");
    setTimeout(() => setButtonText("Add to Cart"), 3000);
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Left Side - Product Image */}
          <div className="md:w-1/2">
            <div className="relative pb-[75%]">
              {" "}
              {/* Adjusted aspect ratio */}
              <img
                className="absolute inset-0 w-full h-full object-cover object-center"
                src={product.imageUrl}
                alt={product.name}
              />
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-violet-600 mb-4">
                {formatPrice(product.price)}
              </p>
              <div className="border-t border-gray-200 my-4"></div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Add to Cart Button and Quantity Selector */}
            <div className="mt-auto">
              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 rounded-l-md bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-xl font-medium text-gray-600">-</span>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-16 h-10 text-center border-t border-b border-gray-200"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 rounded-r-md bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-xl font-medium text-gray-600">+</span>
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-violet-600 text-white py-3 px-6 rounded-lg hover:bg-violet-700 transition-colors duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span>{buttonText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;