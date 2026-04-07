import { useState } from "react";
import { API_URL } from "../services/api";

export default function ChatBox() {
  const [msg, setMsg] = useState("");
  const [history, setHistory] = useState([]);

  const handleSend = async () => {
    if (!msg.trim()) return;
    setHistory((prev) => [...prev, { type: "user", text: msg }]);
    setMsg("");
    setHistory((prev) => [...prev, { type: "ai", text: "AI is thinking..." }]);

    try {
      const response = await fetch(`${API_URL}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msg }),
      });
      const data = await response.json();
      console.log("AI Response:", data);
      setHistory((prev) => [
        ...prev.filter((item) => item.type !== "ai" || item.text !== "AI is thinking..."),
        { type: "ai", text: data?.reply || "Here’s a smart idea: focus on skills that match your goals." },
      ]);
    } catch (error) {
      console.error("AI chat failed", error);
      setHistory((prev) => [
        ...prev.filter((item) => item.type !== "ai" || item.text !== "AI is thinking..."),
        { type: "ai", text: "AI service is unavailable right now. Try again later." },
      ]);
    }
  };

  return (
    <div className="glass" style={{ padding: "24px", marginTop: "24px" }}>
      <h3>AI Career Chat</h3>
      <div style={{ minHeight: "160px", margin: "18px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
        {history.length === 0 ? (
          <p style={{ opacity: 0.75 }}>Ask something about your career path or skills.</p>
        ) : (
          history.map((item, index) => (
            <div key={index} style={{ alignSelf: item.type === "user" ? "flex-end" : "flex-start", background: item.type === "user" ? "rgba(59,130,246,0.18)" : "rgba(255,255,255,0.08)", padding: "12px 14px", borderRadius: "14px", maxWidth: "85%" }}>
              {item.text}
            </div>
          ))
        )}
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Ask something..."
          style={{ flex: 1, padding: "12px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "#fff" }}
        />
        <button className="btn-glow" onClick={handleSend} style={{ flexShrink: 0 }}>
          Send
        </button>
      </div>
    </div>
  );
}
