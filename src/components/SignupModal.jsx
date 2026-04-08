import { useState } from "react";
import { registerUser } from "../services/api";

export default function SignupModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await registerUser({ email, password });
      alert("Signup successful ✅");
      onClose();
    } catch {
      alert("Signup failed ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded w-[350px]">

        <h2 className="text-xl mb-4 text-center">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-gray-800 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup} className="w-full bg-blue-500 p-2 rounded">
          Sign Up
        </button>

      </div>
    </div>
  );
}