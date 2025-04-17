import React from "react";
import OrderHistory from "../components/profile/OrderHistory";

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Profile</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <OrderHistory />
      </div>
    </div>
  );
};

export default Profile;