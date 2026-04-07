export default function CareerDetails({ current }) {
  return (
    <div className="glass" style={{ padding: "40px" }}>
      <h2>{current.title || current.name}</h2>
      <p style={{ opacity: 0.8, margin: "18px 0 24px" }}>
        {current.description || "Protect systems and networks from attacks"}
      </p>

      <h4 style={{ marginBottom: "14px" }}>Key Skills</h4>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {(current.skills || ["Java", "React", "SQL"]).map((skill, index) => (
          <span key={index} style={{ padding: "8px 12px", borderRadius: "999px", background: "rgba(79, 70, 229, 0.18)", color: "#e0e7ff", fontSize: "0.95rem" }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
