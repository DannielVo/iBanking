// src/api.js
import axios from "axios";

const SERVICES = {
  account: "http://127.0.0.1:8000",
  customer: "http://127.0.0.1:8001",
  auth: "http://127.0.0.1:8002/auth",
  payment: "http://127.0.0.1:8003",
  otp: "http://127.0.0.1:8004",
  email: "http://127.0.0.1:8005",
};

// Hàm chung gọi API
export async function apiRequest(service, endpoint, options = {}) {
  const url = `${SERVICES[service]}${endpoint}`;

  try {
    const response = await axios({
      url,
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        ...(options.headers || {}),
      },
      data: options.body ? JSON.parse(options.body) : undefined, // fetch body → axios data
      params: options.params || undefined, // query params nếu có
    });

    return response.data; // axios trả về { data, status, headers... }
  } catch (err) {
    console.error("API Request Error:", err.response || err.message);
    throw err.response?.data || err;
  }
}
