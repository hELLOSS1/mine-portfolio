import React from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const AdminHeader = () => {
  const { data } = usePortfolio();

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
      </div>
    </header>
  );
};

export default AdminHeader;
