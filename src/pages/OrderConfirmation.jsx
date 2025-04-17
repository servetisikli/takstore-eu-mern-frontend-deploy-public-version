import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <FaCheckCircle className="mx-auto text-green-500 text-6xl mb-6" />
          <h1 className="text-4xl font-bold mb-4 text-green-600">
            Thank you for your order!
          </h1>
          <div className="h-1 w-20 bg-green-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 mb-4">
            Your order has been placed successfully.
          </p>
          <p className="text-gray-500 mb-8">
            Details of your order have been sent to your email.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center justify-center mx-auto shadow-md hover:shadow-lg transform hover:-translate-y-1 cursor-pointer active:scale-95"
          >
            <FaShoppingCart className="mr-2" />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
