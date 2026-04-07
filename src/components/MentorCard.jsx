export default function MentorCard({ mentor, onSelect }) {
  return (
    <div
      style={card}
      onClick={() => onSelect?.(mentor)}
    >
      <div style={avatar}>{mentor.name?.charAt(0)}</div>
      <div>
        <h3 style={title}>{mentor.name}</h3>
        <p style={subtitle}>{mentor.expertise || mentor.domain}</p>
      </div>
    </div>
  );
}

const card = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "18px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  cursor: "pointer",
};

const avatar = {
  width: "54px",
  height: "54px",
  borderRadius: "999px",
  background: "linear-gradient(135deg,#5f9cff,#7a5fff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "20px",
  fontWeight: "bold",
};

const title = {
  margin: "0 0 6px 0",
};

const subtitle = {
  margin: 0,
  color: "#cbd5e1",
  fontSize: "14px",
};
