import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './App.jsx'; // Import only Navbar

function Login({ onSignUp, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (email === 'admin@realmadrid.com' && password === 'admin123') {
      if (onLoginSuccess) onLoginSuccess();
      navigate('/admin-dashboard');
      return;
    }
    try {
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Sign-in successful!');
        if (onLoginSuccess) onLoginSuccess();
        navigate('/');
      } else {
        setMessage(data.error || 'Sign-in failed');
      }
    } catch {
      setMessage('Server error');
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-bg">
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>LogIn</h2>
            <div className="login-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
            {message && <div className="login-extra">{message}</div>}
            <div className="login-extra">
              Don't have an account?{' '}
              <a
                href="#"
                className="login-link"
                onClick={e => {
                  e.preventDefault();
                  // Always navigate to sign-up page
                  navigate('/sign-in');
                }}
              >
                Create Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
