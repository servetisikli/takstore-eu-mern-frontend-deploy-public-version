import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "../context/CartContext";
import PaymentForm from "../components/payment/PaymentForm";
import api from "../services/api";

// Vite ortam değişkeni kullanımı
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Backend'den clientSecret'ı al
    const fetchClientSecret = async () => {
      try {
        const { data } = await api.post(
          `/api/order/${orderId}/create-payment-intent`
        );
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, [orderId]);

  const options = {
    clientSecret, // Stripe Elements için gerekli
  };

  const handlePaymentSuccess = () => {
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Complete Your Payment
      </h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm
              orderId={orderId}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </Elements>
        ) : (
          <p>Loading payment details...</p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
