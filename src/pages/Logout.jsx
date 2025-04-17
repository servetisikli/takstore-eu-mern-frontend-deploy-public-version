import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { HiLogout } from "react-icons/hi";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    message: "Logging out...",
    isError: false,
    progress: 0,
  });

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Start progress animation
        const interval = setInterval(() => {
          setStatus((prev) => ({
            ...prev,
            progress: Math.min(prev.progress + 2, 100),
          }));
        }, 20);

        await logout();

        setStatus({
          message: "Successfully logged out!",
          isError: false,
          progress: 100,
        });

        // Cleanup interval
        clearInterval(interval);

        // Redirect after animation completes
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (error) {
        setStatus({
          message: "Error logging out. Please try again.",
          isError: true,
          progress: 100,
        });
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <div className="mb-6">
          <HiLogout
            className={`w-16 h-16 mx-auto ${
              status.isError ? "text-red-500" : "text-blue-600"
            }`}
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {status.isError ? "Oops!" : "See You Soon!"}
        </h1>

        <p
          className={`text-lg mb-6 ${
            status.isError ? "text-red-600" : "text-gray-600"
          }`}
        >
          {status.message}
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              status.isError ? "bg-red-500" : "bg-blue-600"
            }`}
            style={{ width: `${status.progress}%` }}
          />
        </div>

        {status.isError && (
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Return Home
          </button>
        )}
      </div>
    </div>
  );
};

export default Logout;
