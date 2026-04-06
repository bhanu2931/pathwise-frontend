export default function Features() {
  const features = [
    {
      icon: '🧠',
      title: 'AI Career Assessment',
      description: 'Advanced psychometric tests and AI analysis map your personality, skills, and interests to ideal career paths with 94% accuracy.'
    },
    {
      icon: '🎯',
      title: 'Personalized Roadmaps',
      description: 'Get a step-by-step actionable career roadmap customized to your current skills, goals, and target industry.'
    },
    {
      icon: '👨‍💼',
      title: '1-on-1 Mentorship',
      description: 'Connect with verified industry professionals and certified counselors for personalized guidance and insider advice.'
    },
    {
      icon: '📚',
      title: 'Skill Development',
      description: 'Access curated courses, certifications, and resources hand-picked by mentors for your specific career target.'
    },
    {
      icon: '🌐',
      title: 'Industry Insights',
      description: 'Real-time salary data, job trends, and market intelligence to make informed career decisions with confidence.'
    },
    {
      icon: '🤝',
      title: 'Networking Hub',
      description: 'Join peer communities, attend virtual career fairs, and build your professional network before you even graduate.'
    }
  ]

  return (
    <section className="features" id="features">
      <div className="features-badge">PLATFORM FEATURES</div>
      <h2>Everything You Need To Launch Your Dream Career</h2>
      <p className="features-subtitle">From self-discovery to job placement, PathWise guides you every step of the way with cutting-edge tools and expert support.</p>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
