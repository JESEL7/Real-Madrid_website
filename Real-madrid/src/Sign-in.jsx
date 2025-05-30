import React, { useState } from 'react';
import './Sign-in.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    alert(`Signed in as: ${email}`);
  };

  return (
    <>
      <div className="signin-bg"></div>
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
          <div className="signin-extra">
            Already have an account? <a href="#" className="signin-link">Login</a>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
