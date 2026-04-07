import { useEffect, useState } from "react";
import { getMentors } from "../services/api";
import BookSession from "../components/BookSession";

export default function Dashboard({ user }) {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    getMentors()
      .then((data) => setMentors(data || []))
      .catch(() => setMentors([]));
  }, []);

  return (
    <div style={container}>
      <div style={header}>
        <div>
          <h1>Welcome back, {user?.email || "Learner"}</h1>
          <p>Browse expert mentors and book your next session.</p>
        </div>
      </div>

      <section style={section}>
        <h2>Our Expert Mentors</h2>
        <div style={grid}>
          {mentors.length === 0 ? (
            <p>No mentors available right now.</p>
          ) : (
            mentors.map((mentor) => (
              <div key={mentor.id || mentor.name} style={card}>
                <div style={avatar}>{mentor.name?.charAt(0)}</div>
                <div>
                  <h3 style={cardTitle}>{mentor.name}</h3>
                  <p style={cardText}>{mentor.expertise || mentor.domain || "Expert Mentor"}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section style={sessionSection}>
        <h2>Book a Session</h2>
        <BookSession user={user?.email || ""} />
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

const card = {
  display: "flex",
  gap: "18px",
  padding: "24px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  alignItems: "center",
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
