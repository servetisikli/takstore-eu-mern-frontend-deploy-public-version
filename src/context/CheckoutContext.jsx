import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { useAuth } from "./AuthContext"; // Import useAuth from AuthContext
import api from "../services/api";

const CheckoutContext = createContext();

const CheckoutProvider = ({ children }) => {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useAuth(); // Get user from AuthContext
  const [checkoutInfo, setCheckoutInfo] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setCheckoutInfo((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // phone: user.phone, // Uncomment if phone is available in user model
      }));
    }
  }, [user]);

  const placeOrder = async () => {
    const orderData = {
      orderItems: cart.items.map((item) => ({
        product: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.quantity,
      })),
      shippingAddress: {
        address: checkoutInfo.address,
        city: checkoutInfo.city,
        postalCode: checkoutInfo.postalCode,
        country: checkoutInfo.country,
      },
      itemsPrice: cart.total,
      customerInfo: {
        firstName: checkoutInfo.firstName,
        lastName: checkoutInfo.lastName,
        email: checkoutInfo.email,
        phone: checkoutInfo.phone,
      },
    };

    console.log("Order Data:", orderData); // Log order data for debugging

    try {
      const config = user
        ? {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        : {};

      const { data } = await api.post("/api/order", orderData);
      // Instead of clearing cart and navigating immediately,
      // navigate to payment page
      navigate(`/payment/${data._id}`);
    } catch (error) {
      console.error("Order placement failed:", error);
    }
  };

  return (
    <CheckoutContext.Provider
      value={{ checkoutInfo, setCheckoutInfo, placeOrder, user, cart }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export { CheckoutContext, CheckoutProvider };
