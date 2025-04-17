import React, { useEffect, useState } from "react";
import api from "../../services/api";
import formatPrice from "../../components/utils/formatPrice";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/api/order/myorders");
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">
                Order {order.orderNumber}
              </h3>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Status:</span> {order.status}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Total Price:</span>{" "}
                {formatPrice(order.totalPrice)}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Order Date:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <ul className="space-y-2">
                {order.orderItems.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between items-center"
                  >
                    <span>{item.name}</span>
                    <span>
                      {item.qty} x {formatPrice(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
