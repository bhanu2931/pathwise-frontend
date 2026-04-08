import { useState } from "react";
import { getUser, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLoginClick }) => {
  const user = getUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const getInitial = () => {
    if (!user) return "";
    return user.replace("token_", "").charAt(0).toUpperCase();
  };

  return (
    <div className="flex justify-between items-center px-10 py-5 border-b border-white/10 sticky top-0 z-50 bg-[#020617]">

      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer gradient-text"
      >
        PathWise
      </h1>

      {/* NAV */}
      <div className="hidden md:flex gap-8 text-gray-300 text-sm">
        <span onClick={() => navigate("/")} className="cursor-pointer hover:text-white">Home</span>
        <span className="cursor-pointer hover:text-white">Features</span>
        <span className="cursor-pointer hover:text-white">Career</span>
        <span className="cursor-pointer hover:text-white">Pricing</span>
        <span onClick={() => navigate("/ai")} className="cursor-pointer hover:text-white">AI</span>
      </div>

      {/* RIGHT */}
      {!user ? (
        <button onClick={onLoginClick} className="btn-glow">
          Get Started
        </button>
      ) : (
        <div className="relative">

          <div
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer"
          >
            {getInitial()}
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-40 bg-[#020617] border border-white/10 rounded-lg p-2">

              <button
                onClick={() => {
                  navigate("/dashboard");
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-white/10 rounded"
              >
                Dashboard
              </button>

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/20 rounded"
              >
                Logout
              </button>

            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Navbar;