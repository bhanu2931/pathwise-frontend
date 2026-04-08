const Particles = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-blue-500 opacity-20 rounded-full animate-pulse"
          style={{
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
        />
      ))}
    </div>
  );
};

export default Particles;