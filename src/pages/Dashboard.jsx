import { useEffect, useState } from "react";
import { getMentors } from "../services/api";
import BookSession from "../components/BookSession";
import MentorCard from "../components/MentorCard";
import ChatBox from "../components/ChatBox";
import Loader from "../components/Loader";

export default function Dashboard({ user }) {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);
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

  const handleBook = async (mentorId) => {
    setBookingId(mentorId);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mentorId,
          date: "2026-04-10",
          userEmail: storedUser?.email,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Booking successful:", data);
        alert("Session booked successfully 🎉");
      } else {
        const error = await res.json();
        alert(error.message || "Booking failed ❌");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Server error ❌");
    } finally {
      setBookingId(null);
    }
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
        <h2>Our Expert Mentors 🎯</h2>
        <div style={grid}>
          {mentors.length === 0 ? (
            <p>No mentors available right now.</p>
          ) : (
            mentors.map((mentor) => (
              <div key={mentor.id || mentor.name} className="glass" style={mentorCard}>
                <div style={mentorAvatar}>{mentor.name?.charAt(0) || "M"}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={mentorTitle}>{mentor.name}</h3>
                  <p style={mentorExpertise}>{mentor.expertise || mentor.domain || "Expert Mentor"}</p>
                  <p style={mentorRating}>⭐ {mentor.rating || "4.9"}/5</p>
                </div>
                <button
                  onClick={() => handleBook(mentor.id)}
                  disabled={bookingId === mentor.id}
                  style={{
                    ...bookBtn,
                    opacity: bookingId === mentor.id ? 0.6 : 1,
                    cursor: bookingId === mentor.id ? "not-allowed" : "pointer",
                  }}
                >
                  {bookingId === mentor.id ? "Booking..." : "Book"}
                </button>
              </div>
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

const mentorCard = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "16px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  marginBottom: "12px",
};

const mentorAvatar = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #5f9cff, #7a5fff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "18px",
  fontWeight: "bold",
  flexShrink: 0,
};

const mentorTitle = {
  margin: "0 0 4px 0",
  fontSize: "16px",
  fontWeight: "600",
  color: "#fff",
};

const mentorExpertise = {
  margin: "0 0 4px 0",
  fontSize: "13px",
  color: "#cbd5e1",
};

const mentorRating = {
  margin: 0,
  fontSize: "12px",
  color: "#fbbf24",
};

const bookBtn = {
  padding: "8px 16px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(90deg, #4f46e5, #3b82f6)",
  color: "#fff",
  fontWeight: "600",
  fontSize: "13px",
  cursor: "pointer",
  whiteSpace: "nowrap",
  flexShrink: 0,
  boxShadow: "0 0 12px rgba(79, 70, 229, 0.5)",
  transition: "all 0.3s ease",
};
