import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CareerPaths from "./components/CareerPaths";
import AuthModal from "./components/AuthModal";
import Dashboard from "./components/Dashboard";
import Mentors from "./components/Mentors";
import AISuggestion from "./components/AISuggestion";
import BookSession from "./components/BookSession";

function App() {

  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <>
      <Navbar 
        openLogin={() => setShowAuth(true)} 
        user={user}
        setUser={setUser}
      />

      {/* 🔓 BEFORE LOGIN */}
      {!user && (
        <>
          <Hero />
          <CareerPaths />
        </>
      )}

      {/* 🔐 AFTER LOGIN */}
      {user && (
        <div style={mainContainer}>

          <Dashboard user={user} />

          <section style={section}>
            <Mentors />
          </section>

          <section style={section}>
            <BookSession user={user} />
          </section>

          <section style={section}>
            <AISuggestion />
          </section>

        </div>
      )}

      <AuthModal
        show={showAuth}
        close={() => setShowAuth(false)}
        setUser={setUser}
      />
    </>
  );
}

const mainContainer = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 20px",
};

const section = {
  marginTop: "50px",
};

export default App;
