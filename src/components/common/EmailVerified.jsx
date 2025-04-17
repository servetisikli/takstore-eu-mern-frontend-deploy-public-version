import React from "react";
import { useNavigate } from "react-router-dom";

const EmailVerified = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-green-600">
          Email Verification Successful
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          Your email has been verified successfully. You can now log in.
        </p>
        <div className="text-center">
          <button
            onClick={handleLoginRedirect}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerified;
