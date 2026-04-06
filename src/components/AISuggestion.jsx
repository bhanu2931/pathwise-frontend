import { useState } from "react";

export default function AISuggestion() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    fetch(`http://localhost:8080/api/ai/suggest?interest=${encodeURIComponent(input)}`)
      .then(res => res.text())
      .then(data => {
        const aiMsg = { sender: "ai", text: data };
        setMessages(prev => [...prev, aiMsg]);
        setInput("");
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        const errorMsg = { sender: "ai", text: "Sorry, I couldn't fetch a suggestion right now." };
        setMessages(prev => [...prev, errorMsg]);
        setLoading(false);
      });
  };

  return (
    <div style={container}>
      <h2 style={title}>🤖 AI Career Chat</h2>

      <div style={chatCard}>
        <div style={messageList}>
          {messages.length === 0 ? (
            <div style={emptyState}>Ask about your interests and get career guidance from AI.</div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                style={msg.sender === "user" ? userMessage : aiMessage}
              >
                <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
              </div>
            ))
          )}
        </div>

        <div style={inputRow}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your career interest..."
            style={inputStyle}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button style={sendBtn} onClick={sendMessage}>
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
  color: "#fff",
  textAlign: "center"
};

const title = {
  fontSize: "28px",
  marginBottom: "20px"
};

const chatCard = {
  maxWidth: "700px",
  margin: "0 auto",
  padding: "25px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.08)"
};

const messageList = {
  minHeight: "240px",
  marginBottom: "20px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const emptyState = {
  color: "#aaa",
  fontStyle: "italic"
};

const userMessage = {
  alignSelf: "flex-end",
  background: "rgba(95,159,255,0.15)",
  color: "#fff",
  padding: "12px 16px",
  borderRadius: "16px",
  maxWidth: "80%"
};

const aiMessage = {
  alignSelf: "flex-start",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  padding: "12px 16px",
  borderRadius: "16px",
  maxWidth: "80%"
};

const inputRow = {
  display: "flex",
  gap: "12px",
  alignItems: "center"
};

const inputStyle = {
  flex: 1,
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  outline: "none"
};

const sendBtn = {
  padding: "12px 20px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(90deg,#5f9cff,#7a5fff)",
  color: "#fff",
  cursor: "pointer"
};