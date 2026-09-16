import React, { useRef } from 'react';
import './MainContent.css';
import { Moon, Sun, ChevronUp, Folder } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ProjectsContent = () => {
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
          <h2 style={{ fontSize: '24px', color: 'var(--text-dark)' }}>My Projects</h2>
          
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

        <section className="flex-col clay-card" style={{ boxShadow: 'none', background: 'transparent', padding: 0, border: 'none' }}>
          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {data.projects.map(proj => (
              <div className="project-card clay-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }} key={proj.id}>
                <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '160px', objectFit: 'cover', margin: 0, borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{proj.title}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>{proj.desc}</p>
                  <div className="tags" style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {(proj.tags || []).map(tag => (
                      <span className="tag" key={tag} style={{ background: 'var(--bg-color)', color: 'var(--primary)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', border: '1px solid rgba(156,122,237,0.2)' }}>
                        {tag}
                      </span>
                    ))}
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
            <h4 style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: '500' }}>Explore my recent works!</h4>
          </div>
        </div>
        <button className="btn back-to-top-btn" onClick={scrollToTop}>
          <ChevronUp size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> Back to Top
        </button>
      </footer>
    </main>
  );
};

export default ProjectsContent;
