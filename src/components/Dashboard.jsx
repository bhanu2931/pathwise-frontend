import { useEffect, useState } from "react";
import BASE_URL from "../api";

export default function Dashboard({ user }) {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/appointments`)
      .then(res => res.json())
      .then(data => {
        const userData = data.filter(a => a.email === user);
        setAppointments(userData);
      });
  }, [user]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome to Dashboard</h1>
      <p>You are logged in as {user}!</p>
      
      <h2>Your Sessions</h2>
      {appointments.length > 0 ? (
        appointments.map((a, i) => (
          <div key={i}>
            📅 {a.date} with {a.mentor}
          </div>
        ))
      ) : (
        <p>No sessions booked yet.</p>
      )}
    </div>
  );
}

const container = {
  padding: "40px",
  color: "#fff"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
  marginTop: "20px"
};

const card = {
  background: "rgba(255,255,255,0.05)",
  padding: "30px",
  borderRadius: "12px",
  textAlign: "center",
  cursor: "pointer"
};