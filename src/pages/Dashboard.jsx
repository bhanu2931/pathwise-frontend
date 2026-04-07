import { useEffect, useState } from "react";
import { getMentors } from "../services/api";
import BookSession from "../components/BookSession";
import MentorCard from "../components/MentorCard";
import ChatBox from "../components/ChatBox";
import Loader from "../components/Loader";

export default function Dashboard({ user }) {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Protect dashboard - redirect if not logged in
  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, [token]);

  useEffect(() => {
    getMentors()
      .then((data) => {
        console.log("Mentors:", data);
        setMentors(data || []);
      })
      .catch((error) => {
        console.error("Mentor fetch failed", error);
        setMentors([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (loading) return <Loader />;

  return (
    <div style={container} className="fade-in">
      <div style={header}>
        <div>
          <h1>Welcome back, {storedUser?.email || "Learner"} 🎉</h1>
          <p>Browse expert mentors and book your next session.</p>
        </div>
        <button onClick={handleLogout} style={logoutBtn}>
          Logout
        </button>
      </div>

      <section style={section}>
        <h2>Our Expert Mentors</h2>
        <div style={grid}>
          {mentors.length === 0 ? (
            <p>No mentors available right now.</p>
          ) : (
            mentors.map((mentor) => (
              <MentorCard key={mentor.id || mentor.name} mentor={mentor} />
            ))
          )}
        </div>
      </section>

      <section style={sessionSection}>
        <div style={sessionHeader}>
          <div>
            <h2>Book a Session</h2>
            <p>Choose a mentor and get personalized guidance in minutes.</p>
          </div>
        </div>
        <div style={sessionGrid}>
          <div style={leftPanel}>
            <BookSession user={storedUser?.email || ""} />
          </div>
          <div style={rightPanel}>
            <ChatBox />
          </div>
        </div>
      </section>
    </div>
  );
}

const container = {
  padding: "40px 20px",
  color: "#fff",
};

const header = {
  marginBottom: "40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
};

const logoutBtn = {
  padding: "10px 20px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(90deg, #ef4444, #dc2626)",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};


const section = {
  marginTop: "20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const sessionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  marginBottom: "24px",
};

const sessionGrid = {
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
  gap: "24px",
  marginTop: "20px",
};

const leftPanel = {
  borderRadius: "24px",
  padding: "24px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const rightPanel = {
  borderRadius: "24px",
  padding: "24px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const card = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
  padding: "24px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const avatar = {
  width: "54px",
  height: "54px",
  borderRadius: "50%",
  background: "linear-gradient(135deg,#5f9cff,#7a5fff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "20px",
  fontWeight: "bold",
};

const cardTitle = {
  margin: "0 0 6px 0",
};

const cardText = {
  margin: 0,
  color: "#cbd5e1",
};
