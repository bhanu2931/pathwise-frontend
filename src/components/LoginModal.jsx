import { useState } from "react";
import { loginUser, registerUser } from "../services/api";
import { setUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      let res;

      if (isSignup) {
        res = await registerUser({ email, password });

        // 🔥 HANDLE RESPONSE
        if (res === "User already exists") {
          alert("⚠️ User already exists");
          return;
        }

        alert("✅ Signup successful! Please login");
        setIsSignup(false);
        return;
      } else {
        res = await loginUser({ email, password });

        // 🔥 HANDLE LOGIN ERRORS
        if (
          res === "User not found" ||
          res === "Invalid password" ||
          res === "Missing credentials"
        ) {
          alert("❌ " + res);
          return;
        }

        // ✅ SUCCESS LOGIN
        setUser(res);
        alert("✅ Login successful");
        navigate("/dashboard");
        onClose();
      }

    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50">

      <div className="relative w-[420px] p-8 rounded-2xl bg-[#020617] border border-white/10 shadow-2xl">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 text-xl"
        >
          ×
        </button>

        {/* TITLE */}
        <h2 className="text-3xl text-center mb-6">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 rounded bg-[#0f172a]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-[#0f172a]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="btn-primary w-full"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        {/* TOGGLE */}
        <p className="text-center mt-4 text-gray-400">
          {isSignup ? "Already have an account?" : "New user?"}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-400 ml-1 cursor-pointer"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>

        {/* DIVIDER */}
        <div className="text-center text-xs text-gray-500 mt-5">
          OR CONTINUE WITH
        </div>

        {/* SOCIAL BUTTONS */}
        <button className="google-btn">
          🔴 Continue with Google
        </button>

        <button className="linkedin-btn">
          🔵 Continue with LinkedIn
        </button>

      </div>
    </div>
  );
};

export default LoginModal;