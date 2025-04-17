import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import {
  HiTrash,
  HiPlus,
  HiMinus,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import formatPrice from "../components/utils/formatPrice";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => (
  <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
    {/* Product Image */}
    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Product Details */}
    <div className="flex-1 min-w-0">
      <h3 className="text-lg font-medium text-gray-900 truncate">
        {item.name}
      </h3>
      <p className="text-violet-600 font-medium mt-1">
        {formatPrice(item.price)}
      </p>
    </div>

    {/* Quantity Controls */}
    <div className="flex items-center gap-2">
      <button
        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        disabled={item.quantity <= 1}
        className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <HiMinus className="w-5 h-5 text-gray-600" />
      </button>
      <span className="w-8 text-center font-medium">{item.quantity}</span>
      <button
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        className="p-1 rounded-full hover:bg-gray-100"
      >
        <HiPlus className="w-5 h-5 text-gray-600" />
      </button>
    </div>

    {/* Remove Button */}
    <button
      onClick={() => onRemove(item.id)}
      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
    >
      <HiTrash className="w-5 h-5" />
    </button>
  </div>
);

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <HiOutlineShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      Your cart is empty
    </h3>
    <p className="text-gray-500 mb-4">
      Add some items to your cart to continue shopping
    </p>
  </div>
);

const Cart = () => {
  const {
    cart,
    removeItem,
    updateQuantity,
    clearCart,
    getCartTotal,
    getItemCount,
  } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Shopping Cart ({getItemCount()})
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1"
        >
          <HiTrash className="w-4 h-4" />
          Clear Cart
        </button>
      </div>

      {/* Cart Items */}
      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="divide-y divide-gray-200">
          {cart.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-lg font-medium text-gray-900">
            {formatPrice(getCartTotal())}
          </span>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => navigate("/checkout")}
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="w-full py-3 px-4 border border-violet-600 text-violet-600 hover:bg-violet-50 font-medium rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
