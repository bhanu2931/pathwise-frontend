import { useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: "Hi 👋 Ask me about careers!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;

    const userMsg = { text: input, sender: "user" };

    // Simple AI response (demo)
    const botMsg = {
      text:
        input.toLowerCase().includes("career")
          ? "I recommend Software Engineering or Data Science 🚀"
          : "Great question! Explore your interests and skills 👍",
      sender: "bot",
    };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 glass p-4">

      <div className="h-60 overflow-y-auto mb-3 space-y-2">

        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              m.sender === "user"
                ? "bg-blue-500 text-right"
                : "bg-gray-700 text-left"
            }`}
          >
            {m.text}
          </div>
        ))}

      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI..."
          className="flex-1"
        />
        <button onClick={handleSend} className="btn-primary px-3">
          ➤
        </button>
      </div>

    </div>
  );
};

export default ChatBox;