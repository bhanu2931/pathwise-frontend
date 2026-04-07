import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ onClose, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setUser?.(data.user);
        alert("Login Successful ✅");
        onClose?.();
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to PathWise</p>

        <div className="badge">🚀 AI-POWERED CAREER PLATFORM</div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="signup-text">
          Don't have an account? <span>Sign Up</span>
        </p>

        <div className="divider">OR CONTINUE WITH</div>

        <button className="google-btn">Sign in with Google</button>
        <button className="linkedin-btn">Sign in with LinkedIn</button>

      </div>
    </div>
  );
}
