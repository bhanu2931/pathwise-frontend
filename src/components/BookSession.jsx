import { useState } from "react";
import { bookSession } from "../services/api";
import toast from "react-hot-toast";

export default function BookSession({ user }) {

  const [date, setDate] = useState("");
  const activeUser = user || JSON.parse(localStorage.getItem("user"))?.email;
  const mentor = localStorage.getItem("selectedMentor");

  const handleBook = async () => {
    if (!mentor) {
      toast.error("Please select a mentor first.");
      return;
    }

    if (!activeUser) {
      toast.error("Please sign in before booking a session.");
      return;
    }

    const payload = {
      mentorId: Number(mentor) || mentor,
      date: date || "2026-04-10",
      userEmail: activeUser,
    };

    try {
      const res = await bookSession(payload);
      console.log("Book session response:", res);
      toast.success("Session booked successfully 🚀");
      setDate("");
    } catch (error) {
      console.error("Booking failed", error);
      toast.error("Booking failed. Please try again.");
    }
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

        <button onClick={handleBook} style={btn}>
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