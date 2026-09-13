import React, { useState } from 'react';
import { Home, User, Folder, Code2, Briefcase, Award, MessageSquare, Layout, Crown, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const AdminSidebar = () => {
  const { data } = usePortfolio();
  const [activeTab, setActiveTab] = useState('Dashboard');

  const navItems = [
    { icon: <Home size={16} />, label: 'Dashboard' },
    { icon: <User size={16} />, label: 'Portfolio Settings' },
    { icon: <Folder size={16} />, label: 'Projects' },
    { icon: <Code2 size={16} />, label: 'Skills' },
    { icon: <Briefcase size={16} />, label: 'Experience' },
    { icon: <User size={16} />, label: 'About Me' },
    { icon: <Award size={16} />, label: 'Certificates' },
    { icon: <MessageSquare size={16} />, label: 'Contact Messages' },
    { icon: <Layout size={16} />, label: 'Theme & Appearance' },
    { icon: <Layout size={16} />, label: 'Social Links' },
    { icon: <Layout size={16} />, label: 'Blog / Posts' },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="flex-col" style={{ alignItems: 'center', gap: '8px' }}>
        <div className="avatar-container" style={{ width: '64px', height: '64px' }}>
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(data.hero.name)}&background=9C81F2&color=fff&size=128`} alt={data.hero.name} className="avatar" />
          <div className="status-dot"></div>
        </div>
        <div className="user-info text-center">
          <h3 style={{ fontSize: '14px' }}>Hi, I'm {data.hero.name}!</h3>
          <p style={{ fontSize: '10px' }}>{data.hero.role}</p>
        </div>
      </div>

      <nav className="admin-sidebar-menu">
        {navItems.map((item, index) => (
          <a 
            key={index} 
            href="#" 
            onClick={(e) => { e.preventDefault(); setActiveTab(item.label); }}
            className={`admin-nav-link ${activeTab === item.label ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="live-preview-card flex-col gap-2">
        <Crown size={24} color="#F6AD55" style={{ margin: '0 auto' }} />
        <h4 style={{ fontSize: '13px', fontWeight: 'bold' }}>Live Preview</h4>
        <p style={{ fontSize: '10px', color: 'rgba(0,0,0,0.6)' }}>See changes instantly in your portfolio</p>
        <button 
          className="btn"
          style={{ background: 'white', color: 'var(--primary)', border: 'none', borderRadius: '4px', fontSize: '11px', padding: '6px' }}
          onClick={() => window.open('/', '_blank')}
        >
          View Portfolio <ExternalLink size={12} />
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
