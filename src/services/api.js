export const API_URL = "https://pathwise-backend-q14f.onrender.com";

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();

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
  const res = await fetch(`${API_URL}/mentors`);
  return res.json();
};

export const getCareerPaths = async () => {
  const res = await fetch(`${API_URL}/careers`);
  return res.json();
};

export const bookSession = async (payload) => {
  const res = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};
