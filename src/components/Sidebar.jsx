import React, { useState } from 'react';
import './Sidebar.css';
import { Home, User, Code2, Folder, Briefcase, Award, MessageSquare, FileText, Layout, Crown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Sidebar = () => {
  const { data, activeTab, setActiveTab } = usePortfolio();

  const navItems = [
    { icon: <Home size={18} />, label: 'Dashboard' },
    { icon: <User size={18} />, label: 'About Me' },
    { icon: <Code2 size={18} />, label: 'Skills' },
    { icon: <Folder size={18} />, label: 'Projects' },
    { icon: <Briefcase size={18} />, label: 'Experience' },
    { icon: <Award size={18} />, label: 'Achievements' },
    { icon: <MessageSquare size={18} />, label: 'Contact Me' },
    { icon: <FileText size={18} />, label: 'Resume' },
    { icon: <Layout size={18} />, label: 'Blog' },
  ];

  return (
    <aside className="sidebar flex-col justify-between">
      <div className="flex-col" style={{ alignItems: 'center', gap: '8px' }}>
        <div className="avatar-container">
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(data.hero.name)}&background=9C81F2&color=fff&size=128`} alt={`${data.hero.name} Avatar`} className="avatar" />
          <div className="status-dot"></div>
        </div>
        <div className="user-info text-center">
          <h3>Hi, I'm {data.hero.name}! <span role="img" aria-label="wave">👋</span></h3>
          <p>{data.hero.role}</p>
        </div>
      </div>

      <nav className="nav-menu">
        {navItems.map((item, index) => (
          <a 
            key={index} 
            href="#" 
            onClick={(e) => { e.preventDefault(); setActiveTab(item.label); }}
            className={`nav-link ${activeTab === item.label ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="hire-me-card">
        <div className="crown-icon">
          <Crown size={24} color="#F6AD55" />
        </div>
        <h4>Hire Me</h4>
        <p>Let's work together</p>
        <button 
          className="btn btn-pink"
          onClick={() => window.location.href = "mailto:mia.dev@email.com"}
        >
          Get In Touch
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
