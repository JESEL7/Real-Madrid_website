import React, { useState } from 'react';
import './Sign-in.css';
import { useNavigate } from 'react-router-dom';

function SignIn({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Sign-in successful!');
        if (onLogin) onLogin();
        navigate('/'); // Redirect to home page on successful sign-in
      } else {
        setMessage(data.error || 'Sign-in failed');
      }
    } catch {
      setMessage('Server error');
    }
  };

  return (
      <div className="signin-bg">
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <div className="signin-field">
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
          <div className="signin-field">
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
          <button type="submit" className="signin-btn">Sign In</button>
          {message && <div className="signin-extra">{message}</div>}
          <div className="signin-extra">
            Already have an account?{' '}
            <a
              href="#"
              className="signin-link"
              onClick={e => {
                e.preventDefault();
                navigate('/login');
              }}
            >
              Login
            </a>
          </div>
        </form>
      </div>
      </div>
  );
}

export default SignIn;
