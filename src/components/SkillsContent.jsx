import React, { useRef } from 'react';
import './MainContent.css';
import { Search, Moon, Sun, ChevronUp, Code2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const SkillsContent = () => {
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
          <h2 style={{ fontSize: '24px', color: 'var(--text-dark)' }}>My Skills</h2>
          
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
            <div className="title-icon-small" style={{ background: '#F4EFFF', padding: '6px', borderRadius: '8px' }}><Code2 size={18} color="#A181FF"/></div> 
            Technical Proficiency
          </h3>
          
          <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {data.skills.map((skill, index) => (
              <div key={index} className="skill-item flex-col" style={{ gap: '8px' }}>
                <div className="flex-row justify-between">
                  <span className="skill-name" style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{skill.name}</span>
                  <span className="skill-percent" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{skill.percent}</span>
                </div>
                <div className="progress-bg neumorphic-inset-small" style={{ height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div className="progress-fill" style={{ width: skill.percent, background: skill.color, height: '100%', borderRadius: '4px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="footer-banner clay-purple-box flex-row justify-between" style={{ alignItems: 'center', padding: '16px 32px', marginTop: '20px' }}>
        <div className="flex-row gap-4" style={{ alignItems: 'center' }}>
          <div>
            <h4 style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: '500' }}>Always learning and growing!</h4>
          </div>
        </div>
        <button className="btn back-to-top-btn" onClick={scrollToTop}>
          <ChevronUp size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> Back to Top
        </button>
      </footer>
    </main>
  );
};

export default SkillsContent;
