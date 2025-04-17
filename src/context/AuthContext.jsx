import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const { data } = await api.get("/api/user/me");
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();

    // Set interval for token refresh
    const interval = setInterval(async () => {
      try {
        await api.post("/api/user/refresh-token");
      } catch (error) {
        console.error("Token refresh failed:", error);
      }
    }, 55 * 60 * 1000); // Refresh token every 55 minutes

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await api.post("/api/user/login", { email, password });
      setUser(data);
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error("Incorrect username or password");
      } else {
        throw new Error(error.response?.data?.message || "An error occurred");
      }
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/api/user/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext };
