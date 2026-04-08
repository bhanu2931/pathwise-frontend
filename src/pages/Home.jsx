import { useState } from "react";
import { bookSession } from "../services/api";
import { getUser } from "../utils/auth";

const Home = () => {
  const [mentor, setMentor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const user = getUser();

  const mentors = ["Dr. Rajesh", "Dr. Priya", "Dr. Kumar"];

  const handleBooking = async () => {
    if (!user) {
      alert("⚠️ Please login first");
      return;
    }

    if (!mentor || !date || !time) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      await bookSession({
        mentorName: mentor,
        date,
        time,
      });

      alert(`✅ Session booked with ${mentor}`);

      setMentor("");
      setDate("");
      setTime("");

    } catch (err) {
      console.error(err);
      alert("❌ Booking failed");
    }
  };

  return (
    <div className="px-10 py-10">

      {/* HERO */}
      <div className="text-center mt-10">
        <h1 className="text-5xl font-bold">
          Discover <span className="gradient-text">Your Career Path</span>
        </h1>

        <p className="text-gray-400 mt-4">
          AI-powered career guidance platform 🚀
        </p>

        {user && (
          <p className="text-blue-400 mt-4">
            👋 Welcome, {user.replace("token_", "")}
          </p>
        )}
      </div>

      {/* BOOKING */}
      <div className="mt-20 max-w-xl mx-auto glass p-6 space-y-4">

        <h2 className="text-xl text-center">📅 Book a Session</h2>

        <select
          value={mentor}
          onChange={(e) => setMentor(e.target.value)}
          className="input"
        >
          <option value="">Select Mentor</option>
          {mentors.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          className="input"
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="input"
        />

        <button onClick={handleBooking} className="btn-primary">
          Book Session
        </button>

      </div>

    </div>
  );
};

export default Home;