import { useState } from "react";
import { API_URL } from "../services/api";

export default function BookSession({ user }) {

  const [date, setDate] = useState("");
  const activeUser = user || JSON.parse(localStorage.getItem("user"))?.email;
  const mentor = localStorage.getItem("selectedMentor");

  const bookSession = () => {

    if (!mentor) {
      alert("Please select a mentor first");
      return;
    }

    if (!activeUser) {
      alert("Please sign in before booking a session.");
      return;
    }

    fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: activeUser,
        mentor: mentor,
        date: date
      })
    })
    .then(res => res.json())
    .then(() => {
      alert("Session Booked ✅");
      setDate("");
    });
  };

  return (
    <div style={container}>
      <div style={card}>

        <h2>📅 Book a Session</h2>

        <p>Mentor: <b>{mentor || "Select from Mentors"}</b></p>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={input}
        />

        <button onClick={bookSession} style={btn}>
          Book Session
        </button>

      </div>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
};

const card = {
  background: "#111",
  padding: "30px",
  borderRadius: "15px",
  color: "#fff",
  width: "300px",
  textAlign: "center"
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "15px"
};

const btn = {
  marginTop: "15px",
  width: "100%",
  padding: "10px",
  background: "linear-gradient(90deg,#5f9cff,#8f5fff)",
  border: "none",
  color: "#fff",
  borderRadius: "8px",
  cursor: "pointer"
};