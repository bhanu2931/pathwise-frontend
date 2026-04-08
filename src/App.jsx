import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AI from "./pages/AI";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>

      {/* TOAST */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#020617",
            color: "#fff",
          },
        }}
      />

      <div className="flex flex-col min-h-screen bg-[#020617] text-white">

        {/* ✅ ONLY ONE NAVBAR */}
        <Navbar onLoginClick={() => setShowLogin(true)} />

        {/* MAIN */}
        <div className="flex-1">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai" element={<AI />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>

        </div>

        {/* LOGIN MODAL */}
        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
        />

      </div>

    </Router>
  );
}

export default App;