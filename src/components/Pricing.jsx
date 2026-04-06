export default function Pricing() {
  const plans = [
    {
      emoji: '🌱',
      name: 'Free',
      subtitle: 'Perfect to explore your options',
      price: 'Free',
      features: [
        '✓ Basic career assessment',
        '✓ 3 career path guides',
        '✓ Community access',
        '✓ Job board access',
        '✓ 2 mentor messages/month'
      ],
      button: 'Get Started Free',
      popular: false
    },
    {
      emoji: '⚡',
      name: 'Pro',
      subtitle: 'For serious career growth',
      price: '₹499/mo',
      features: [
        '✓ Full AI assessment suite',
        '✓ Unlimited career paths',
        '✓ 4 mentor sessions/month',
        '✓ Custom roadmap',
        '✓ Resume & LinkedIn review',
        '✓ Priority support'
      ],
      button: 'Start Pro Trial',
      popular: true
    },
    {
      emoji: '👑',
      name: 'Elite',
      subtitle: 'For accelerated placement',
      price: '₹999/mo',
      features: [
        '✓ Everything in Pro',
        '✓ Unlimited mentor sessions',
        '✓ Dedicated career coach',
        '✓ Mock interviews',
        '✓ Company referrals',
        '✓ Placement guarantee'
      ],
      button: 'Go Elite',
      popular: false
    }
  ]

  return (
    <section className="pricing" id="pricing">
      <div className="pricing-badge">PRICING</div>
      <h2>Invest in Your Future</h2>
      <p className="pricing-subtitle">Transparent pricing, no hidden fees. Start free and scale as you grow.</p>
      <div className="pricing-toggle">
        <span>Monthly</span>
        <span className="toggle-dots">•</span>
        <span>Yearly</span>
      </div>
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && <div className="popular-badge">MOST POPULAR</div>}
            <div className="plan-header">
              <h3><span className="plan-emoji">{plan.emoji}</span> {plan.name}</h3>
              <p className="plan-subtitle">{plan.subtitle}</p>
            </div>
            <p className="price">{plan.price}</p>
            <ul className="features-list">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button className={plan.popular ? 'btn-primary' : 'btn-secondary'}>{plan.button}</button>
          </div>
        ))}
      </div>
    </section>
  )
}
