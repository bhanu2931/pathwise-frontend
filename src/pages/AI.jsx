import { useState } from "react";
import { askAI } from "../services/api";

const AI = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");

    try {
      const res = await askAI(message);
      setChat((prev) => [...prev, { role: "bot", text: res }]);
    } catch {
      setChat((prev) => [
        ...prev,
        { role: "bot", text: "Error getting response" },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-70px)] bg-[#020617] text-white">

      {/* HEADER */}
      <div className="text-center py-4 border-b border-white/10">
        <h1 className="text-xl font-semibold">🤖 AI Career Assistant</h1>
        <p className="text-gray-400 text-sm">
          Ask anything about your career path
        </p>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-3xl mx-auto w-full">

        {chat.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Try asking:
            <br />
            <span className="text-blue-400">
              Which career suits a CSE student?
            </span>
          </p>
        )}

        {chat.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-600 ml-auto"
                : "bg-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-white/10 flex gap-3">

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your career question..."
          className="flex-1 p-3 rounded bg-gray-800 outline-none"
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 px-5 rounded hover:scale-105 transition"
        >
          Send
        </button>

      </div>
    </div>
  );
};

export default AI;