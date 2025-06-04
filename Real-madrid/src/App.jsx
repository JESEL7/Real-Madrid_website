import { useState } from 'react'
// import viteLogo from '/vite.svg' // Remove unused import
import realMadridLogo from './assets/real-madrid-logo.png'
import './App.css'
import News from './News.jsx'
import Squad from './Squad.jsx'
import Fixtures from './Fixtures.jsx'
import Achievement from './Achievement.jsx'
import SignIn from './Sign-in.jsx'

import Login from './login.jsx'
import Shop from './Shop.jsx'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div>
        <img src={realMadridLogo} alt="Real Madrid Logo" className="rm-logo-fixed" />
        <h1 className='clubname'>Real Madrid C.F</h1>
      </div>
      <div className="navbar-list">
        <div className="navbar-center">
          <ul>
            <li><a href="#" onClick={e => { e.preventDefault(); navigate('/'); }}>Home</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#squad">Squad</a></li>
            <li><a href="#fixtures">Fixtures</a></li>
            <li><a href="#achievements">Achievements</a></li>
            <li><a href="#shop">Shop</a></li>
          </ul>
        </div>
        <div className="navbar-right">
          <ul>
            <li className='sign-up'>
              <a href="#" onClick={e => { e.preventDefault(); navigate('/sign-in'); }}>Sign-up</a>
            </li>
            <li>
              <a href="#" onClick={e => { e.preventDefault(); navigate('/login'); }}>Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };

function HomeContent() {
  return (
    <div>
      <Navbar />
      <div className="main-card">
        <h2>About</h2>
        <p>Real Madrid Club de Fútbol, founded in 1902, is more than just a football club — it’s a global symbol of excellence, dominance, and legacy in world football. Based in Madrid, Spain, the club has set the benchmark for greatness with a history built on success, passion, and iconic moments.

With a record-breaking 15 UEFA Champions League titles and 36 La Liga championships, Real Madrid is officially the most successful club in European football. The team is celebrated for its legendary white kit and plays at the iconic Santiago Bernabéu Stadium.

From the golden days of Di Stéfano, Raúl, and Cristiano Ronaldo to the new era led by stars like Jude Bellingham, Kylian Mbappé, and Vinícius Júnior, the club continues to evolve while staying true to its historic values.</p>
      </div>
      <News />
      <Squad />
      <Fixtures />
      <Achievement />
      <Shop /> {/* Place Shop below Achievement */}
    </div>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<HomeContent />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-in" element={
        <div>
          <Navbar />
          <SignIn />
        </div>
      } />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App