import { useState } from "react";
import { bookSession } from "../services/api";
import toast from "react-hot-toast";

const mentors = [
  { name: "Dr. Rajesh", role: "Software Architect" },
  { name: "Anita Sharma", role: "Data Scientist" },
  { name: "Rahul Verma", role: "Cybersecurity Expert" },
];

const Mentors = () => {
  const [selected, setSelected] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = async () => {
    if (!selected || !date || !time) {
      toast.error("Please select all fields ❌");
      return;
    }

    try {
      await bookSession({
        mentorName: selected,
        date,
        time,
      });

      toast.success("Session booked successfully 🎉");

      setSelected("");
      setDate("");
      setTime("");

    } catch (err) {
      toast.error("Booking failed ❌");
    }
  };

  return (
    <div className="mt-24 px-6 text-center">

      <h2 className="text-3xl mb-10">
        Learn from <span className="gradient-text">Experts</span>
      </h2>

      {/* MENTORS */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">

        {mentors.map((m, i) => (
          <div
            key={i}
            className="glass p-6 hover:scale-105 transition duration-300"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              {m.name[0]}
            </div>

            <h3 className="font-semibold">{m.name}</h3>
            <p className="text-gray-400">{m.role}</p>

            <button
              onClick={() => setSelected(m.name)}
              className={`mt-4 px-4 py-2 rounded ${
                selected === m.name
                  ? "bg-green-500"
                  : "btn-primary"
              }`}
            >
              {selected === m.name ? "Selected" : "Select"}
            </button>
          </div>
        ))}

      </div>

      {/* BOOKING */}
      <div className="glass p-8 max-w-md mx-auto">

        <h3 className="text-xl mb-4">📅 Book a Session</h3>

        <p className="text-gray-400 mb-4">
          Mentor: <span className="text-blue-400">
            {selected || "Select from above"}
          </span>
        </p>

        <input
          type="date"
          className="w-full mb-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          className="w-full mb-4"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button onClick={handleBooking} className="btn-primary">
          Book Session
        </button>

      </div>

    </div>
  );
};

export default Mentors;