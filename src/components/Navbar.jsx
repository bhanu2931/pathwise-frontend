import { useState } from "react";

export default function Navbar({ openLogin, user, setUser }) {

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowMenu(false);
  };

  return (
    <nav style={navStyle}>

      {/* LEFT LOGO */}
      <h2 style={{ color: "#fff" }}>🚀 PathWise</h2>

      {/* CENTER NAV */}
      <div style={{ display: "flex", gap: "20px" }}>
        <span style={navLink}>Career Paths</span>
        <span style={navLink}>Mentors</span>
        <span style={navLink}>Sessions</span>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", alignItems: "center" }}>

        {!user ? (
          <button style={loginBtn} onClick={openLogin}>
            Sign In
          </button>
        ) : (
          <div style={{ position: "relative" }}>

            {/* PROFILE CIRCLE */}
            <div
              onClick={() => setShowMenu(!showMenu)}
              style={avatar}
            >
              {user.charAt(0).toUpperCase()}
            </div>

            {/* DROPDOWN */}
            {showMenu && (
              <div style={dropdown}>
                
                <p style={emailText}>{user}</p>

                <button style={logoutBtn} onClick={handleLogout}
                  onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
                  onMouseOut={(e) => e.target.style.background = "rgba(255,255,255,0.05)"}
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}

/* 🎨 STYLES */

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  background: "#0b1120",
  position: "relative",
  zIndex: 1000 // 🔥 important
};

const navLink = {
  color: "#cbd5e1",
  cursor: "pointer",
  fontSize: "14px"
};

const loginBtn = {
  padding: "10px 18px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(90deg,#5f9cff,#7a5fff)",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

const avatar = {
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  background: "linear-gradient(135deg,#5f9cff,#7a5fff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "18px",
  cursor: "pointer"
};

const dropdown = {
  position: "absolute",
  top: "60px",
  right: "0",
  background: "rgba(15, 23, 42, 0.95)",
  backdropFilter: "blur(12px)",
  padding: "16px",
  borderRadius: "14px",
  width: "240px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
  textAlign: "center",
  zIndex: 9999, // 🔥 VERY IMPORTANT (fix overlap)
  border: "1px solid rgba(255,255,255,0.08)"
};

const emailText = {
  marginBottom: "12px",
  fontSize: "14px",
  color: "#cbd5e1",
  wordBreak: "break-all"
};

const logoutBtn = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "500",
  transition: "0.3s"
};
