import { useState, useEffect } from 'react'
import { getCareerPaths } from '../services/api'
import CareerCard from './CareerCard'
import CareerDetails from './CareerDetails'

export default function CareerPaths() {

  const [selectedPath, setSelectedPath] = useState(0)
  const [paths, setPaths] = useState([])

  // 🔥 DEFAULT DATA (fallback)
  const defaultPaths = [
    { 
      icon: '💻',
      name: 'Software Engineering',
      salary: '₹8L – ₹40L',
      growth: '+22%',
      description: 'Build scalable software systems and web/mobile applications driving the digital world.',
      skills: ['DSA', 'System Design', 'Cloud', 'DevOps']
    },
    {
      icon: '🤖',
      name: 'AI / Machine Learning',
      salary: '₹12L – ₹60L',
      growth: '+35%',
      description: 'Create intelligent systems using cutting-edge ML algorithms and neural networks.',
      skills: ['Python', 'TensorFlow', 'Deep Learning', 'NLP']
    }
  ]

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    getCareerPaths()
      .then(data => {
        if (data && data.length > 0) {
          setPaths(data)
        } else {
          setPaths(defaultPaths)
        }
      })
      .catch(() => {
        setPaths(defaultPaths)
      })
  }, [])

  const displayPaths = paths.length > 0 ? paths : defaultPaths
  const current = displayPaths[selectedPath] || displayPaths[0]

  return (
    <section className="career-paths" id="career-paths">
      <h2>Find Your Ideal Career Track</h2>

      <p className="paths-subtitle">
        Explore trending career paths with salary insights, growth rates, and skill requirements.
      </p>

      <div className="paths-container">

        {/* LEFT LIST */}
        <div className="paths-list">
          {displayPaths.map((path, index) => (
            <CareerCard
              key={index}
              path={path}
              active={selectedPath === index}
              onClick={() => setSelectedPath(index)}
            />
          ))}
        </div>

        {/* RIGHT DETAIL */}
        <CareerDetails current={current} />
      </div>
    </section>
  )
}