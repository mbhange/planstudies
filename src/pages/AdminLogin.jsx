import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/CreateAccount.css"

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const savedData = JSON.parse(localStorage.getItem(email));
    if (savedData && savedData.password === password && savedData.role === 'admin') {
      alert('Login successful!');
      navigate('/admin-dashboard');
    } else {
      alert('Invalid credentials or role mismatch');
    }
  };

  return (
    <div className='create'>
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} className="form">
          <label>Email:</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password:</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
