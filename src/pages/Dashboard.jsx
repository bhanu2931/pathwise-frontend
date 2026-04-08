import { useEffect, useState } from "react";
import { getBookings } from "../services/api";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await getBookings();
      setData(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#020617] text-white min-h-screen px-10 py-10">

      <h1 className="text-3xl font-bold mb-8">📊 Your Bookings</h1>

      {data.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          No bookings yet 🚀
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {data.map((item) => (
            <div
              key={item.id}
              className="glass p-6 rounded-xl hover:scale-105 transition duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  👨‍🏫 {item.mentorName}
                </h2>
                <span className="text-xs bg-blue-500/20 px-2 py-1 rounded">
                  Session
                </span>
              </div>

              <div className="space-y-2 text-gray-300 text-sm">
                <p>📅 <b>Date:</b> {item.date}</p>
                <p>⏰ <b>Time:</b> {item.time}</p>
              </div>

              <button className="mt-5 w-full bg-gradient-to-r from-blue-500 to-purple-500 py-2 rounded-lg text-sm hover:opacity-90">
                View Details
              </button>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Dashboard;