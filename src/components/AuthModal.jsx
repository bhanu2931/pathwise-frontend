import { useState } from "react";
import BASE_URL from "../api";

export default function AuthModal({ show, close, setUser }) {

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleLogin = async () => {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.text();
    setLoading(false);
    if (data === "Login Success") {
      localStorage.setItem("user", email.split("@")[0]); // 🔥 store user
      setUser(email.split("@")[0]);
      close();
    } else {
      alert(data);
    }
  };

  const handleSignup = async () => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();
    alert("Registered successfully");
    setIsSignup(false);
  };

  return (
    <div style={overlay}>
      <div style={card}>

        <h2 style={title}>Welcome Back</h2>
        <p style={subtitle}>Sign in to PathWise</p>

        {isSignup && (
          <input
            style={input}
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          style={input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={mainBtn} onClick={isSignup ? handleSignup : handleLogin}>
          {loading ? "Loading..." : (isSignup ? "Create Account" : "Sign In")}
        </button>

        <p style={switchText} onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </p>

        {/* Divider */}
        <div style={divider}>OR CONTINUE WITH</div>

        {/* Google Button */}
        <button style={googleBtn}>
          🔴 Sign in with Google
        </button>

        {/* LinkedIn Button */}
        <button style={linkedinBtn}>
          🔵 Sign in with LinkedIn
        </button>

        <p style={terms}>
          By signing in, you agree to our Terms & Privacy Policy.
        </p>

        <button style={closeBtn} onClick={close}>✕</button>
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.85)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999
};

const card = {
  width: "360px",
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(10, 20, 50, 0.95)",
  boxShadow: "0 0 40px rgba(0,0,0,0.9)",
  textAlign: "center",
  color: "#fff",
  position: "relative"
};

const title = { marginBottom: "5px" };
const subtitle = { marginBottom: "20px", color: "#aaa" };

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #333",
  background: "#111",
  color: "#fff"
};

const mainBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(90deg,#5f9cff,#7a5fff)",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px"
};

const switchText = {
  marginTop: "10px",
  fontSize: "14px",
  cursor: "pointer",
  color: "#aaa"
};

const divider = {
  margin: "15px 0",
  fontSize: "12px",
  color: "#777"
};

const googleBtn = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#fff",
  color: "#000",
  cursor: "pointer"
};

const linkedinBtn = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#0077b5",
  color: "#fff",
  cursor: "pointer"
};

const terms = {
  marginTop: "10px",
  fontSize: "12px",
  color: "#777"
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "15px",
  background: "transparent",
  border: "none",
  color: "#fff",
  fontSize: "18px",
  cursor: "pointer"
};