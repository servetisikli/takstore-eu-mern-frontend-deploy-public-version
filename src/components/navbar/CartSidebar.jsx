import { useContext } from "react";
import { motion } from "framer-motion";
import { HiX, HiTrash } from "react-icons/hi";
import { useNavbar } from "../../context/layout/NavbarContext";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import formatPrice from "../utils/formatPrice";

const CartSidebar = () => {
  const { setIsCartOpen } = useNavbar();
  const navigate = useNavigate();
  const { cart, removeItem, updateQuantity, getCartTotal, getItemCount } =
    useContext(CartContext);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">
              Shopping Cart ({getItemCount()})
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:text-violet-600 transition-colors"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p className="mb-4">Your cart is empty</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate("/");
                  }}
                  className="text-violet-600 hover:text-violet-700 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.items.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  layout
                  className="flex items-center p-4 hover:bg-gray-50"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-2 flex items-center">
                      <button
                        className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(0, item.quantity - 1)
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="p-2 text-gray-400 hover:text-red-500"
                    onClick={() => removeItem(item.id)}
                  >
                    <HiTrash className="w-5 h-5" />
                  </button>
                </motion.div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {formatPrice(getCartTotal())}
                </span>
              </div>

              {/* View Cart Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/cart");
                }}
                className="w-full py-3 px-4 border border-violet-600 text-violet-600 hover:bg-violet-50 font-medium rounded-lg transition-colors"
              >
                View Cart
              </button>

              {/* Checkout Button */}

              <button
                onClick={handleCheckout}
                className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default CartSidebar;
