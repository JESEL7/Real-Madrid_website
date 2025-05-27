import React, { useState } from 'react'
import './Squad.css'

// Import images
import courtoisImg from './assets/courtois.jpg'
import carvajalImg from './assets/carvajal.jpg'
import rudigerImg from './assets/rudiger.jpg'
import bellinghamImg from './assets/bellingham.jpg'
import viniImg from './assets/vini.jpg'
import mbappeImg from './assets/mbappe.jpg'

// Example player data (use imported images)
const players = [
  { name: "Thibaut Courtois", position: "Goalkeeper", img: courtoisImg },
  { name: "Dani Carvajal", position: "Defender", img: carvajalImg },
  { name: "Antonio Rüdiger", position: "Defender", img: rudigerImg },
  { name: "Jude Bellingham", position: "Midfielder", img: bellinghamImg },
  { name: "Vinícius Júnior", position: "Forward", img: viniImg },
  { name: "Kylian Mbappé", position: "Forward", img: mbappeImg }
  
  // ...add more players as needed
]

function Squad() {
  const [start, setStart] = useState(0)
  const visibleCount = 3

  const handlePrev = () => {
    setStart(prev => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setStart(prev => Math.min(prev + 1, players.length - visibleCount))
  }

  const visiblePlayers = players.slice(start, start + visibleCount)

  return (
    <div className="squad-container">
      <h2>Players</h2>
    <div className="squad-slider-container">
      <button className="squad-arrow left" onClick={handlePrev} disabled={start === 0}>&lt;</button>
      <div className="squad-cards-row">
        {visiblePlayers.map((player, idx) => (
          <div
            className="squad-player-card"
            key={player.name + idx}
            style={{
              backgroundImage: `url(${player.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="squad-player-info">
              <h4>{player.name}</h4>
              <p>{player.position}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="squad-arrow right" onClick={handleNext} disabled={start >= players.length - visibleCount}>&gt;</button>
        </div>
        </div>
  )
}

export default Squad
