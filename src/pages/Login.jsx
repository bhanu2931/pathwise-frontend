import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const res = await loginUser({ email, password });
    setLoading(false);

    if (res.success) {
      const userData = { email };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser?.(userData);
      navigate("/dashboard");
    } else {
      alert(res.message || "Login failed");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Sign In to PathWise</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={input}
        />
        <button style={button} onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "#050816",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 20px",
};

const card = {
  width: "100%",
  maxWidth: "420px",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "24px",
  padding: "32px",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 40px 80px rgba(0,0,0,0.25)",
  color: "#fff",
};

const input = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  marginBottom: "16px",
  outline: "none",
};

const button = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(90deg,#5f9cff,#7a5fff)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};
