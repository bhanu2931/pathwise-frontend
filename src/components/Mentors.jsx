import { useEffect, useState } from "react";
import { getMentors } from "../services/api";
import MentorCard from "./MentorCard";

export default function Mentors() {

  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    getMentors()
      .then((data) => setMentors(data || []))
      .catch(() => setMentors([]));
  }, []);

  return (
    <div style={container}>
      <h2 style={title}>Our Expert Mentors</h2>

      <div style={grid}>
        {mentors.map((m) => (
          <MentorCard
            key={m.id || m.name}
            mentor={m}
            onSelect={(mentor) => {
              localStorage.setItem("selectedMentor", mentor.name);
              window.scrollTo(0, document.body.scrollHeight);
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  width: "100%",
  padding: "50px",
  color: "#fff",
  textAlign: "center"
};

const title = {
  fontSize: "28px",
  marginBottom: "30px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px"
};

const card = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "20px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.08)",
  transition: "all 0.3s ease",
  cursor: "pointer"
};

const avatar = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: "linear-gradient(135deg,#5f9cff,#7a5fff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "18px"
};

const name = {
  margin: 0
};

const field = {
  margin: 0,
  color: "#aaa",
  fontSize: "14px"
};
