export const API_URL = "https://pathwise-backend-q14f.onrender.com";
export default API_URL;

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || "API failed");
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      success: text === "Login Success" || text === "Login successful",
      message: text,
      user: { email: data.email },
    };
  }
};

export const getMentors = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/mentors`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API failed");
  }

  return res.json();
};

export const getCareerPaths = async () => {
  const res = await fetch(`${API_URL}/careers`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API failed");
  }
  return res.json();
};

export const bookSession = async (payload) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API failed");
  }

  return res.json();
};
