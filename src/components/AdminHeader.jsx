import React from 'react';
import { Search, Bell, Sparkles, LogOut } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const { data } = usePortfolio();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <header className="admin-header">
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)', fontSize: '20px' }}>
        <Sparkles size={20} color="var(--primary)" /> Portfolio Admin Panel
      </h2>
      
      <div className="admin-search">
        <Search size={16} color="var(--text-muted)" />
        <input type="text" placeholder="Search settings, projects, or anything..." />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={20} color="var(--text-dark)" />
          <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#FF4757', borderRadius: '50%' }}></div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(data.hero.name)}&background=9C81F2&color=fff&size=128`} alt="Admin" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-dark)' }}>{data.hero.name}</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Admin</span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          style={{ background: 'none', border: '1px solid #FF4757', borderRadius: '4px', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '6px', color: '#FF4757', cursor: 'pointer', fontSize: '12px' }}
        >
          <LogOut size={14} /> Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
