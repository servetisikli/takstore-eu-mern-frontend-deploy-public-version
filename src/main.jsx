import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { CheckoutProvider } from "./context/CheckoutContext.jsx";
import { NavbarProvider } from "./context/layout/NavbarContext.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Stripe'ı burada başlat
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <CheckoutProvider>
              <NavbarProvider>
                <Elements stripe={stripePromise}>
                  <App />
                </Elements>
              </NavbarProvider>
            </CheckoutProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
