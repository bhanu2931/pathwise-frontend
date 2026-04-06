import { useEffect, useState } from "react";

export default function Dashboard({ user }) {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/appointments")
      .then(res => res.json())
      .then(data => {
        const userData = data.filter(a => a.email === user);
        setAppointments(userData);
      });
  }, [user]);

  return (
    <div style={{ padding: "30px", color: "#fff" }}>
      <div style={{
        textAlign: "left",
        marginBottom: "30px"
      }}>
        <h2>Welcome, {user}</h2>
        <p>Your Sessions</p>
      </div>

      {appointments.map((a, i) => (
        <div key={i}>
          📅 {a.date} with {a.mentor}
        </div>
      ))}
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