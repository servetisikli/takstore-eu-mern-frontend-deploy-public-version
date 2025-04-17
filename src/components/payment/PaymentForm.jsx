import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import api from "../../services/api";

const PaymentForm = ({ orderId, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const { error: paymentError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/order-confirmation/${orderId}`,
          },
          redirect: "if_required", // Yönlendirme sadece gerekliyse yapılır
        });

      if (paymentError) {
        setError(paymentError.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        await api.put(`/api/order/${orderId}/pay`, {
          payment_intent_id: paymentIntent.id,
        });
        onPaymentSuccess();
      }
    } catch (err) {
      setError("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4">
      {/* Payment Element */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Payment Details</label>
        <div className="border rounded-md p-3 bg-white shadow-sm">
          <PaymentElement />
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`
          w-full py-2 px-4 rounded-md
          ${
            !stripe || isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }
          text-white font-medium transition-colors
        `}
      >
        {isProcessing ? "Processing Payment..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
