import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_URL = import.meta.env.MODE === 'production' ? (import.meta.env.VITE_API_URL || 'https://mine-portfolio-api.onrender.com') : '';
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
      <form onSubmit={handleLogin} className="clay-card flex-col gap-4" style={{ width: '320px' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--primary)' }}>Admin Login</h2>
        {error && <p style={{ color: '#E85F5C', fontSize: '13px', textAlign: 'center' }}>{error}</p>}
        
        <div className="flex-col gap-2">
          <label style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '500' }}>Username</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(156, 129, 242, 0.2)', outline: 'none' }}
          />
        </div>

        <div className="flex-col gap-2">
          <label style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '500' }}>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(156, 129, 242, 0.2)', outline: 'none' }}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
