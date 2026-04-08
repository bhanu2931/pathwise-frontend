import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { setUser } from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      // ✅ FIXED
      setUser(res.token, res.user);

      alert("Login successful ✅");
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <form onSubmit={handleLogin} className="p-6 bg-gray-900 rounded w-[350px]">

        <h2 className="text-xl mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-gray-800 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;