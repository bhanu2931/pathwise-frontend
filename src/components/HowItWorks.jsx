export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      icon: '📝',
      title: 'Create Your Profile',
      description: 'Sign up and complete a detailed profile highlighting your education, skills, interests, and career aspirations.'
    },
    {
      step: 2,
      icon: '🧠',
      title: 'Take AI Assessment',
      description: 'Complete our scientifically-validated psychometric and aptitude tests. Our AI analyzes 50+ data points to understand you deeply.'
    },
    {
      step: 3,
      icon: '🗺️',
      title: 'Get Your Roadmap',
      description: 'Receive a personalized career roadmap with clear milestones, recommended skills, courses, and timeline.'
    },
    {
      step: 4,
      icon: '👨‍🏫',
      title: 'Connect with Mentors',
      description: 'Match with expert mentors from your target industry for 1-on-1 sessions, guidance, and real-world insights.'
    },
    {
      step: 5,
      icon: '📈',
      title: 'Track & Grow',
      description: 'Monitor your progress, complete milestones, get feedback, and continuously refine your strategy for success.'
    }
  ]

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works-badge">HOW IT WORKS</div>
      <h2>Your Career Success in 5 Simple Steps</h2>
      <div className="steps-grid">
        {steps.map((item) => (
          <div key={item.step} className="step-card">
            <div className="step-number">{item.icon} STEP {String(item.step).padStart(2, '0')}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <button className="btn-primary">QUICK ASSESSMENT</button>
    </section>
  )
}
