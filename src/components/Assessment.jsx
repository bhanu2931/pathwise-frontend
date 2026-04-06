export default function Assessment() {
  const questions = [
    'Building & creating systems',
    'Analyzing data & patterns',
    'Designing visuals & experiences',
    'Leading teams & strategy'
  ]

  return (
    <section className="assessment" id="assessment">
      <div className="assessment-badge">QUICK ASSESSMENT</div>
      <h2>Discover Your Career Match</h2>
      <p>Answer 3 quick questions and get an instant career path recommendation.</p>
      <div className="assessment-container">
        <div className="assessment-content">
          <div className="question-header">
            <div className="question-indicator">Question 1 of 3</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '33.33%'}}></div>
            </div>
          </div>
          <h3>What type of work energizes you most?</h3>
          <div className="options">
            {questions.map((q, i) => (
              <button key={i} className="option">{q}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
