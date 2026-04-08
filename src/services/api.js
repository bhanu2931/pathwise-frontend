import axios from "axios";

const API = axios.create({
  baseURL: "https://pathwise-backend-q14f.onrender.com",
});

// ✅ Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ================= AUTH ================= */

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

/* ================= BOOKINGS ================= */

export const bookSession = async (data) => {
  const res = await API.post("/appointments", data);
  return res.data;
};

export const getBookings = async () => {
  const res = await API.get("/appointments");
  return res.data;
};

/* ================= AI ================= */

export const askAI = async (message) => {
  const res = await API.post("/ai/chat", { message });
  return res.data;
};