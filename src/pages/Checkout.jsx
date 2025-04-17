import React, { useContext } from "react";
import { CheckoutContext } from "../context/CheckoutContext";
import formatPrice from "../components/utils/formatPrice";

const CheckoutPage = () => {
  const { checkoutInfo, setCheckoutInfo, placeOrder, user, cart } =
    useContext(CheckoutContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            placeOrder();
          }}
          className="bg-white rounded-lg shadow-sm border p-6 lg:col-span-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={checkoutInfo.firstName}
              onChange={handleInputChange}
              required
              className="border p-2 w-full rounded-lg"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={checkoutInfo.lastName}
              onChange={handleInputChange}
              required
              className="border p-2 w-full rounded-lg"
            />
          </div>
          {!user && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={checkoutInfo.email}
              onChange={handleInputChange}
              required
              className="border p-2 w-full rounded-lg mt-4"
            />
          )}
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={checkoutInfo.phone}
            onChange={handleInputChange}
            required
            className="border p-2 w-full rounded-lg mt-4"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={checkoutInfo.address}
            onChange={handleInputChange}
            required
            className="border p-2 w-full rounded-lg mt-4"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={checkoutInfo.city}
            onChange={handleInputChange}
            required
            className="border p-2 w-full rounded-lg mt-4"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={checkoutInfo.postalCode}
            onChange={handleInputChange}
            required
            className="border p-2 w-full rounded-lg mt-4"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={checkoutInfo.country}
            onChange={handleInputChange}
            required
            className="border p-2 w-full rounded-lg mt-4"
          />
          <button
            type="submit"
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors mt-4"
          >
            Place Order
          </button>
        </form>
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Order Summary
          </h2>
          <ul className="divide-y divide-gray-200">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">
                      Price: {formatPrice(item.price)}
                    </p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-gray-900 font-medium">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <h3 className="text-lg font-bold text-gray-900">Total:</h3>
            <span className="text-lg font-medium text-gray-900">
              {formatPrice(cart.total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
