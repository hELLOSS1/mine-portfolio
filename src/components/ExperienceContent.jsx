import React, { useRef } from 'react';
import './MainContent.css';
import { Moon, Sun, ChevronUp, Briefcase } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ExperienceContent = () => {
  const mainRef = useRef(null);
  const { data, updateRootData } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    updateRootData('theme', data.theme === 'light' ? 'dark' : 'light');
  };

  return (
    <main className="main-content flex-col" ref={mainRef}>
      <div className="top-content-card">
        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '20px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--text-dark)' }}>My Experience</h2>
          
          <div className="search-bar" style={{ flex: 1, width: 'auto', maxWidth: 'none', visibility: 'hidden' }}>
            <input type="text" placeholder="Search..." disabled />
          </div>

          <div className="flex-row gap-4" style={{ alignItems: 'center', flexShrink: 0 }}>
            <div 
              onClick={toggleTheme}
              style={{
                display: 'flex', alignItems: 'center', background: 'var(--card-bg)',
                border: '1px solid var(--border-color, rgba(161, 129, 255, 0.2))',
                borderRadius: '20px', padding: '4px', cursor: 'pointer', boxShadow: 'var(--clay-white)',
                width: '56px', justifyContent: data.theme === 'dark' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                background: 'var(--primary)', borderRadius: '50%', padding: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {data.theme === 'dark' ? <Moon size={14} color="white" /> : <Sun size={14} color="white" />}
              </div>
            </div>
          </div>
        </header>

        <section className="flex-col clay-card" style={{ boxShadow: 'none', background: 'var(--card-bg)', marginBottom: '20px' }}>
          <h3 className="flex-row gap-2" style={{ fontSize: '18px', marginBottom: '24px' }}>
            <div className="title-icon-small" style={{ background: '#FCEEF5', padding: '6px', borderRadius: '8px' }}><Briefcase size={18} color="#F98FB9"/></div>
            Professional Journey
          </h3>
          
          <div className="timeline" style={{ paddingLeft: '10px' }}>
            {data.experience.map((exp) => (
              <div className="timeline-item" key={exp.id} style={{ marginBottom: '32px' }}>
                <div className="timeline-dot" style={{ background: exp.color, width: '16px', height: '16px', left: '-8px' }}></div>
                <div className="timeline-content" style={{ paddingLeft: '32px' }}>
                  <div className="flex-col">
                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '4px' }}>{exp.role}</h4>
                    <p style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: '500', marginBottom: '8px' }}>{exp.company}</p>
                    <span className="date" style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'inline-block', background: 'var(--bg-color)', padding: '4px 12px', borderRadius: '12px' }}>{exp.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="footer-banner clay-purple-box flex-row justify-between" style={{ alignItems: 'center', padding: '16px 32px', marginTop: '20px' }}>
        <div className="flex-row gap-4" style={{ alignItems: 'center' }}>
          <div>
            <h4 style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: '500' }}>Building my career step by step!</h4>
          </div>
        </div>
        <button className="btn back-to-top-btn" onClick={scrollToTop}>
          <ChevronUp size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> Back to Top
        </button>
      </footer>
    </main>
  );
};

export default ExperienceContent;
