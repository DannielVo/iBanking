import React, { createContext, useContext, useState } from "react";
import { apiRequest } from "../utils/api";

const BankingContext = createContext();

export const BankingContextProvider = ({ children }) => {
  const [customerId, setCustomerId] = useState(0);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hàm login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest("auth", "/login", {
        method: "POST",
        body: JSON.stringify({ username: email, password: password }),
      });

      // Giả sử API trả về token và user info
      setToken(data.access_token);
      setCustomerId(data.customerId);

      // Lưu token vào localStorage để dùng cho các request sau
      localStorage.setItem("token", data.access_token);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setCustomerId(0);
    localStorage.removeItem("token");
  };

  return (
    <BankingContext.Provider
      value={{ customerId, token, loading, error, login, logout }}
    >
      {children}
    </BankingContext.Provider>
  );
};

export const useBanking = () => useContext(BankingContext);
