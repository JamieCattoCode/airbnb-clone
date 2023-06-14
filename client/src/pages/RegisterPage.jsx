import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegsiter = (event) => {
    event.preventDefault();
    axios.post('/register', {
      name,
      email,
      password,
    });
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-lg mx-auto" onSubmit={handleRegsiter}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account?
            {' '}
            <Link className="underline text-black" to="/login">Login now!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
