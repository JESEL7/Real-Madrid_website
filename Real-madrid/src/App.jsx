import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import realMadridLogo from './assets/real-madrid-logo.png'
import './App.css'
import News from './News.jsx'
import Squad from './Squad.jsx'

function App() {
  return (
    <div>
      <div>
        <img src={realMadridLogo} alt="Real Madrid Logo" className="rm-logo-fixed" />
        <h1 className='clubname'>Real Madrid C.F</h1>
      </div>
      <nav className="navbar">
        <div className="navbar-list">
          <div className="navbar-center">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">Squad</a></li>
              <li><a href="#">Fixtures</a></li>
              <li><a href="#">Achievments</a></li>
              <li><a href="#">Shop</a></li>
            </ul>
          </div>
          <div className="navbar-right">
            <ul>
              <li className='sign-up'><a href="#">Sign-up</a></li>
              <li><a href="#">Login</a></li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Card below navbar */}
      <div className="main-card">
        <h2>About</h2>
        <p>Real Madrid Club de Fútbol, founded in 1902, is more than just a football club — it’s a global symbol of excellence, dominance, and legacy in world football. Based in Madrid, Spain, the club has set the benchmark for greatness with a history built on success, passion, and iconic moments.

With a record-breaking 15 UEFA Champions League titles and 36 La Liga championships, Real Madrid is officially the most successful club in European football. The team is celebrated for its legendary white kit and plays at the iconic Santiago Bernabéu Stadium.

From the golden days of Di Stéfano, Raúl, and Cristiano Ronaldo to the new era led by stars like Jude Bellingham, Kylian Mbappé, and Vinícius Júnior, the club continues to evolve while staying true to its historic values.</p>
      </div>
      <News></News>
      <Squad></Squad>
    </div>
  )
}
export default App