import React, { useRef } from 'react';
import './MainContent.css';
import { Search, Moon, Sun, ChevronUp, Code2, BookOpen, Monitor, Database, Wrench, Layers } from 'lucide-react';
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginBottom: '20px' }}>
          {data.skillCategories?.map((category) => {
            const categorySkills = data.skills?.filter(s => s.category === category.name) || [];
            if (categorySkills.length === 0) return null;

            let Icon = Code2;
            let iconColor = '#A181FF';
            let iconBg = '#F4EFFF';

            if (category.name === 'Core CS') {
              Icon = BookOpen;
              iconColor = '#4CAF50';
              iconBg = '#E8F5E9';
            } else if (category.name === 'Web Development') {
              Icon = Monitor;
              iconColor = '#2196F3';
              iconBg = '#E3F2FD';
            } else if (category.name === 'Database') {
              Icon = Database;
              iconColor = '#9C27B0';
              iconBg = '#F3E5F5';
            } else if (category.name === 'Tools') {
              Icon = Wrench;
              iconColor = '#F44336';
              iconBg = '#FFEBEE';
            } else if (category.name === 'Other') {
              Icon = Layers;
              iconColor = '#4CAF50';
              iconBg = '#E8F5E9';
            }

            return (
              <section key={category.id} className="flex-col clay-card" style={{ boxShadow: 'none', background: 'var(--card-bg)' }}>
                <h3 className="flex-row gap-2" style={{ fontSize: '16px', marginBottom: '24px', fontWeight: '600' }}>
                  <div className="title-icon-small" style={{ background: iconBg, padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={16} color={iconColor}/>
                  </div> 
                  {category.name}
                </h3>
                
                <div className="skills-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {categorySkills.map((skill, index) => (
                    <div key={index} className="skill-item flex-row gap-4" style={{ alignItems: 'center' }}>
                      {/* You can add individual skill icons here if wanted, or just the progress bar */}
                      {/* The reference image shows an icon next to each skill. We can use a generic icon or omit it */}
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: skill.color || '#F4EFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                         <span style={{ fontSize: '10px', color: 'white', fontWeight: 'bold' }}>{skill.name?.charAt(0) || ''}</span>
                      </div>
                      
                      <div className="flex-col" style={{ flex: 1, gap: '6px' }}>
                        <div className="flex-row justify-between">
                          <span className="skill-name" style={{ fontWeight: '500', color: 'var(--text-dark)', fontSize: '13px' }}>{skill.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
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
