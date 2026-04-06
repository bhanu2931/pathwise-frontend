export default function Testimonials() {
  const testimonials = [
    {
      initials: 'AK',
      name: 'Aditya Kumar',
      achievement: 'Placed at Infosys as SDE',
      rating: 5,
      text: 'PathWise completely changed my career trajectory. The AI assessment was spot on — it identified software engineering as my perfect match. Within 6 months of following the roadmap, I landed my dream job at Infosys!'
    }
  ]

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-badge">SUCCESS STORIES</div>
      <h2>Students Who Made It</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar">{testimonial.initials}</div>
              <div className="testimonial-info">
                <h3>{testimonial.name}</h3>
                <p>{testimonial.achievement}</p>
                <div className="rating">{'⭐'.repeat(testimonial.rating)}</div>
              </div>
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <div className="testimonial-emoji">🚀</div>
          </div>
        ))}
      </div>
    </section>
  )
}
