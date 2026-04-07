import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "./login.css";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      if (res.success) {
        const userData = res.user ? res.user : { email };
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
        localStorage.setItem("user", JSON.stringify(userData));
        setUser?.(userData);
        navigate("/dashboard");
      } else {
        alert(res.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error", err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Sign in to PathWise</p>

        <div className="badge">🚀 AI-POWERED CAREER PLATFORM</div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="forgot">Forgot password?</span>
        </div>

        <button className="btn-login" onClick={handleLogin} disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="signup-text">
          Don’t have an account? <span>Sign Up</span>
        </p>

        <div className="divider">OR CONTINUE WITH</div>

        <div className="social-buttons">
          <button className="google">Sign in with Google</button>
          <button className="linkedin">Sign in with LinkedIn</button>
        </div>

        <p className="terms">
          By signing in, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}

