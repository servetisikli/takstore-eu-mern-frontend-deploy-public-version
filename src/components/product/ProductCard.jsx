import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { CartContext } from "../../context/CartContext";
import { HiOutlineShoppingCart, HiCheck } from "react-icons/hi";
import formatPrice from "../utils/formatPrice";

const ProductCard = ({ product }) => {
  const { addItem } = useContext(CartContext);
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      image: product.imageUrl,
      price: product.price,
      quantity: 1,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000); // Reset after 2 seconds
  };

  const handleViewDetails = () => {
    navigate(
      `/product/${slugify(product.name, { lower: true })}?id=${product._id}`
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Product Image */}
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-t-lg cursor-pointer"
        onClick={handleViewDetails}
        style={{ cursor: "pointer" }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {product.name}
        </h3>
        <p
          className="text-sm text-gray-500 mb-4 overflow-hidden h-10 line-clamp-2"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.description}
        </p>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-violet-600">
            {formatPrice(product.price)}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className="bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition-colors duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              title="Add to Cart"
              style={{ cursor: "pointer" }}
            >
              {addedToCart ? (
                <HiCheck className="w-5 h-5" />
              ) : (
                <HiOutlineShoppingCart className="w-5 h-5" />
              )}
              <span className="hidden sm:inline">{addedToCart ? "Added" : "Add to Cart"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;