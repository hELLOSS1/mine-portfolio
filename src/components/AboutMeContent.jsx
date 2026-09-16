import React, { useRef } from 'react';
import './MainContent.css'; // Reusing styles
import { Search, Moon, Sun, ChevronUp, User, BookOpen, GraduationCap, Target, Heart } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const AboutMeContent = () => {
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
          <h2 style={{ fontSize: '24px', color: 'var(--text-dark)' }}>About Me</h2>
          
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
          <h3 className="flex-row gap-2" style={{ fontSize: '18px', marginBottom: '16px' }}>
            <div className="title-icon-small" style={{ background: '#F4EFFF', padding: '6px', borderRadius: '8px' }}><User size={18} color="#A181FF"/></div> 
            Introduction
          </h3>
          <p style={{ color: 'var(--text-dark)', lineHeight: '1.6' }}>{data.aboutMe.description}</p>
        </section>

        <section className="flex-col clay-card" style={{ boxShadow: 'none', background: 'var(--card-bg)', marginBottom: '20px' }}>
          <h3 className="flex-row gap-2" style={{ fontSize: '18px', marginBottom: '16px' }}>
            <div className="title-icon-small" style={{ background: '#FCEEF5', padding: '6px', borderRadius: '8px' }}><BookOpen size={18} color="#F98FB9"/></div> 
            My Background
          </h3>
          <p style={{ color: 'var(--text-dark)', lineHeight: '1.6' }}>{data.aboutMe.background}</p>
        </section>

        <section className="flex-col clay-card" style={{ boxShadow: 'none', background: 'var(--card-bg)', marginBottom: '20px' }}>
          <h3 className="flex-row gap-2" style={{ fontSize: '18px', marginBottom: '16px' }}>
            <div className="title-icon-small" style={{ background: '#FEF6EC', padding: '6px', borderRadius: '8px' }}><GraduationCap size={18} color="#F7B565"/></div> 
            Education
          </h3>
          <p style={{ color: 'var(--text-dark)', lineHeight: '1.6' }}>{data.aboutMe.education}</p>
        </section>

        <section className="flex-col clay-card" style={{ boxShadow: 'none', background: 'var(--card-bg)', marginBottom: '20px' }}>
          <h3 className="flex-row gap-2" style={{ fontSize: '18px', marginBottom: '16px' }}>
            <div className="title-icon-small" style={{ background: '#EEF6FE', padding: '6px', borderRadius: '8px' }}><Target size={18} color="#6BB5F6"/></div> 
            Career Goals
          </h3>
          <p style={{ color: 'var(--text-dark)', lineHeight: '1.6' }}>{data.aboutMe.careerGoals}</p>
        </section>

        <section className="flex-col clay-card" style={{ boxShadow: 'none', background: 'var(--card-bg)', marginBottom: '20px' }}>
          <h3 className="flex-row gap-2" style={{ fontSize: '18px', marginBottom: '16px' }}>
            <div className="title-icon-small" style={{ background: '#F1EBF9', padding: '6px', borderRadius: '8px' }}><Heart size={18} color="#8E74E6"/></div> 
            Interests
          </h3>
          <p style={{ color: 'var(--text-dark)', lineHeight: '1.6' }}>{data.aboutMe.interests}</p>
        </section>
      </div>

      <footer className="footer-banner clay-purple-box flex-row justify-between" style={{ alignItems: 'center', padding: '16px 32px', marginTop: '20px' }}>
        <div className="flex-row gap-4" style={{ alignItems: 'center' }}>
          <div>
            <h4 style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: '500' }}>Get to know me better!</h4>
          </div>
        </div>
        <button className="btn back-to-top-btn" onClick={scrollToTop}>
          <ChevronUp size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> Back to Top
        </button>
      </footer>
    </main>
  );
};

export default AboutMeContent;
