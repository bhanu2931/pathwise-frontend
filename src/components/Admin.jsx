import { useState } from "react";

export default function Admin() {

  const [name, setName] = useState("");
  const [field, setField] = useState("");

  const addMentor = () => {
    fetch("http://localhost:8080/api/mentors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, field })
    })
    .then(() => alert("Mentor Added ✅"));
  };

  return (
    <div style={{ padding: "30px", color: "#fff" }}>
      <h2>Admin Panel</h2>

      <h3>Add Mentor</h3>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Field"
        onChange={(e) => setField(e.target.value)}
      />

      <button onClick={addMentor}>
        Add Mentor
      </button>
    </div>
  );
}