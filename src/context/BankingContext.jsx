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

  const makePayment = async (customerPaymentId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest("payment", "/make", {
        method: "POST",
        body: JSON.stringify({
          accountId: account.account_id,
          customerId: customerId,
          customerPaymentId: customerPaymentId,
        }),
      });
      await fetchAccountInfo(customerId); // cập nhật biến account để update balance
      return data;
    } catch (err) {
      setError(err.detail);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpEmail = async (otp) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest("otp", "/verify", {
        method: "POST",
        body: JSON.stringify({
          userId: customerId,
          otpCode: otp,
        }),
      });
      // alert("OTP hợp lệ");
      return data;
    } catch (err) {
      setError(err.detail);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendOtpEmail = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest("email", "/send-confirmation/", {
        method: "POST",
        body: JSON.stringify({ customerId: customerId }),
      });
      return data;
    } catch (err) {
      setError(err.detail);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Lấy thtin upaid payment của unpaid customer
  const fetchUnpaidPayment = async (customerId) => {
    if (customerId === 0) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest("payment", "/unpaid/" + customerId, {
        method: "GET",
      });
      return data;
    } catch (err) {
      setError(err.detail);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Lấy thtin unpaid customer
  const fetchCustomerPayment = async (customerId) => {
    if (customerId === 0) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest("customer", "/" + customerId, {
        method: "GET",
      });
      return data;
    } catch (err) {
      setError(err.detail);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Lấy thtin customer của user login
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
      localStorage.setItem("customer", JSON.stringify(data));
    } catch (err) {
      setError(err.detail);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Lấy thtin account của user login
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
      localStorage.setItem("account", JSON.stringify(data));
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
    localStorage.removeItem("customer");
    localStorage.removeItem("account");
  };

  useEffect(() => {
    fetchCustomerInfo(customerId);
    fetchAccountInfo(customerId);
  }, [customerId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const customer = localStorage.getItem("customer");
    const account = localStorage.getItem("account");

    if (token) {
      setToken(token);
      if (customer) {
        setCustomer(JSON.parse(customer));
        setCustomerId(JSON.parse(customer).customer_id);
      }
      if (account) {
        setAccount(JSON.parse(account));
      }
    }
  }, []);

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
        fetchCustomerInfo,
        fetchCustomerPayment,
        fetchUnpaidPayment,
        sendOtpEmail,
        verifyOtpEmail,
        makePayment,
      }}
    >
      {children}
    </BankingContext.Provider>
  );
};

export const useBanking = () => useContext(BankingContext);
