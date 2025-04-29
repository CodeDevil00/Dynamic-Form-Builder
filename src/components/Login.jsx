import React, { useState } from 'react';
import { createUser } from '../api/api';

function Login({ onLoginSuccess }) {
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(rollNumber, name);
      onLoginSuccess(rollNumber);
    } catch (err) {
      setError('Login failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
 