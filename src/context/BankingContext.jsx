import React, { createContext, useContext, useEffect, useState } from "react";
import { apiRequest, SERVICES } from "../utils/api";

const BankingContext = createContext();

export const BankingContextProvider = ({ children }) => {
  const [customerId, setCustomerId] = useState(0);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);
  const [customer, setCustomer] = useState(null);

  const fetchCustomerInfo = async (customerId) => {
    if (customerId === 0) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest("customer", "/" + customerId, {
        method: "GET",
      });
      setCustomer(data);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountInfo = async (customerId) => {
    if (customerId === 0) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest("account", "/" + customerId, {
        method: "GET",
      });
      setAccount(data);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchCustomerInfo(customerId);
    fetchAccountInfo(customerId);
  }, [customerId]);

  return (
    <BankingContext.Provider
      value={{
        customerId,
        token,
        loading,
        error,
        login,
        logout,
        account,
        customer,
      }}
    >
      {children}
    </BankingContext.Provider>
  );
};

export const useBanking = () => useContext(BankingContext);
