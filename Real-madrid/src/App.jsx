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
import Download from './Download.jsx'
import Sponsers from './Sponsers.jsx'
import AdidasCard from './Adidas.jsx'
import EmiratesCard from './Emirates.jsx'
import Footer from './Footer.jsx'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  return (
    <section id="home">
    <nav className="navbar">
      <div>
        <img src={realMadridLogo} alt="Real Madrid Logo" className="rm-logo-fixed" />
        <h1 className='clubname'>Real Madrid C.F</h1>
      </div>
      <div className="navbar-list">
        <div className="navbar-center">
          <ul>
            <li>
              <a
                href="#home"
                onClick={e => {
                  e.preventDefault();
                  navigate('/');
                  setTimeout(() => {
                    const el = document.querySelector('.main-card');
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#news"
                onClick={e => {
                  e.preventDefault();
                  navigate('/');
                  setTimeout(() => {
                    const el = document.getElementById('news');
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                News
              </a>
            </li>
            <li>
              <a
                href="#squad"
                onClick={e => {
                  e.preventDefault();
                  navigate('/');
                  setTimeout(() => {
                    const el = document.getElementById('squad');
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                Squad
              </a>
            </li>
            <li>
              <a
                href="#fixtures"
                onClick={e => {
                  e.preventDefault();
                  navigate('/');
                  setTimeout(() => {
                    const el = document.getElementById('fixtures');
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                Fixtures
              </a>
            </li>
            <li>
              <a
                href="#achievements"
                onClick={e => {
                  e.preventDefault();
                  navigate('/');
                  setTimeout(() => {
                    const el = document.getElementById('achievements');
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                Achievements
              </a>
            </li>
            <li>
              <a
                href="#shop"
                onClick={e => {
                  e.preventDefault();
                  navigate('/');
                  setTimeout(() => {
                    const el = document.getElementById('shop');
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                Shop
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <ul>
            {!isLoggedIn ? (
              <>
                <li className='sign-up'>
                  <a href="#" onClick={e => { e.preventDefault(); navigate('/sign-in'); }}>Sign-up</a>
                </li>
                <li>
                  <a href="#" onClick={e => { e.preventDefault(); navigate('/login'); }}>Login</a>
                </li>
              </>
            ) : (
              <li>
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    if (onLogout) onLogout();
                    navigate('/login');
                  }}
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
    </section>
  );
}

export { Navbar };

function HomeContent({ isLoggedIn, onLogout }) {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="main-card">
        <h2>About</h2>
        <p>Real Madrid Club de Fútbol, founded in 1902, is more than just a football club — it’s a global symbol of excellence, dominance, and legacy in world football. Based in Madrid, Spain, the club has set the benchmark for greatness with a history built on success, passion, and iconic moments.

With a record-breaking 15 UEFA Champions League titles and 36 La Liga championships, Real Madrid is officially the most successful club in European football. The team is celebrated for its legendary white kit and plays at the iconic Santiago Bernabéu Stadium.

From the golden days of Di Stéfano, Raúl, and Cristiano Ronaldo to the new era led by stars like Jude Bellingham, Kylian Mbappé, and Vinícius Júnior, the club continues to evolve while staying true to its historic values.</p>
      </div>
      <News />
      <EmiratesCard />
      <Squad />
      <AdidasCard />
      <Fixtures />
      <Achievement />
      <Shop />
      <Download />
      <Sponsers />
      <Footer />
    </div>
  );
}

function AppContent({ isLoggedIn, onLogout, setIsLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<HomeContent isLoggedIn={isLoggedIn} onLogout={onLogout} />} />
      <Route path="/login" element={
        <Login
          onSignUp={() => setIsLoggedIn(false)}
          onLoginSuccess={() => setIsLoggedIn(true)}
        />
      } />
      <Route path="/sign-in" element={
        <div>
          <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
          <SignIn onLogin={() => setIsLoggedIn(true)} />
        </div>
      } />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <AppContent isLoggedIn={isLoggedIn} onLogout={handleLogout} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
}

export default App