export default function CareerCard({ path, active, onClick }) {
  return (
    <div
      className={`path-list-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="path-icon">{path.icon || "💼"}</span>
      <span className="path-name">{path.title || path.name}</span>
      <span className="path-salary">{path.salary || "₹8L – ₹40L"}</span>
      <span className="path-growth-badge">{path.growth || "+20%"}</span>
    </div>
  );
}
