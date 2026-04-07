import { useState } from "react";
import CareerPaths from "../components/CareerPaths";
import Mentors from "../components/Mentors";
import AISuggestion from "../components/AISuggestion";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

export default function Home({ setUser }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div className="glass" style={{ padding: "60px", textAlign: "center", position: "relative" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px", lineHeight: 1.05, textShadow: "0 0 24px rgba(79, 70, 229, 0.35)" }}>
          Discover Your Perfect Career Path
        </h1>
        <p style={{ opacity: 0.75, fontSize: "1.05rem", maxWidth: "680px", margin: "0 auto 30px" }}>
          AI-powered guidance for your future 🚀
        </p>
        <div style={{ marginTop: "20px" }}>
          <button className="btn-glow" onClick={() => setShowModal(true)}>
            Start Your Journey →
          </button>
        </div>
      </div>

      <CareerPaths />
      <Mentors />
      <AISuggestion />
      <Footer />

      {showModal && <LoginModal setUser={setUser} onClose={() => setShowModal(false)} />}
    </div>
  );
}
