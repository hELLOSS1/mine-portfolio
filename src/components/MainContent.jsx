import React, { useState, useRef } from 'react';
import './MainContent.css';
import { Search, Bell, User, Code, Briefcase, Star, Award, ChevronUp, Folder, Play, Download, Moon, Sun, ChevronRight, ChevronLeft } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const MainContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const mainRef = useRef(null);
  const projectsRef = useRef(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const { data, updateRootData } = usePortfolio();

  const filteredProjects = data.projects.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const scrollToTop = () => {
    mainRef.current.scrollTo({ top: 0, behavior: 'auto' });
  };

  const openResume = () => {
    alert("Opening Resume/CV PDF...");
  };

  const toggleTheme = () => {
    updateRootData('theme', data.theme === 'light' ? 'dark' : 'light');
  };

  const visibleCardsCount = 3; // Hardcoded for desktop, media queries can adjust this if needed
  const maxProjectIndex = Math.max(0, filteredProjects.length - visibleCardsCount);

  const nextProjects = () => {
    if (currentProjectIndex < maxProjectIndex) {
      setCurrentProjectIndex(prev => prev + 1);
    }
  };

  const prevProjects = () => {
    if (currentProjectIndex > 0) {
      setCurrentProjectIndex(prev => prev - 1);
    }
  };

  return (
    <main className="main-content flex-col" ref={mainRef}>
      
      <div className="top-content-card">
        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', position: 'relative' }}>
          <h2 style={{ fontSize: '24px', color: '#2E2A36', flex: 1 }}>Portfolio</h2>
          
          <div className="search-bar" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <input 
              type="text" 
              placeholder="Search anything..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex-row gap-4" style={{ alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
            <div 
              onClick={toggleTheme}
              style={{
                display: 'flex', alignItems: 'center', background: 'var(--card-bg)',
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

      {/* Hero Banner */}
      <section className="hero-banner clay-purple-box">
        <div className="hero-avatar-wrapper" style={{ boxShadow: 'none' }}>
          <img src={data.hero.avatarImg} alt={data.hero.name} className="hero-avatar" />
        </div>
        <div className="hero-content">
          <p className="greeting">Good to see you here! <span role="img" aria-label="wave">👋</span></p>
          <h1>I'm {data.hero.name}<br/>{data.hero.role}</h1>
          <p className="bio">{data.hero.bio}</p>
          <div className="hero-buttons flex-row gap-4 mt-4">
            <button className="btn flex-row gap-2" style={{ padding: '10px 16px', background: '#9E86E1', color: 'white', boxShadow: 'var(--clay-btn-purple)', border: 'none', borderRadius: 'var(--radius-sm)' }} onClick={() => {
              document.querySelector('.projects-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <Play size={14} fill="white" /> View My Work
            </button>
            <button className="btn flex-row gap-2" style={{ padding: '10px 16px', background: 'white', color: '#5C5272', boxShadow: 'var(--clay-btn-white)', border: 'none', borderRadius: 'var(--radius-sm)' }} onClick={openResume}>
              <Download size={14} color="#5C5272" /> Download CV
            </button>
          </div>
        </div>
        <img src={data.hero.plantImg} alt="3D Plant" className="hero-img-right" />
      </section>

      {/* Stats Grid */}
      <section className="stats-grid">
        <div className="stat-card" style={{ background: '#F4EFFF', border: '1px solid rgba(161, 129, 255, 0.2)' }}>
          <div className="icon-box" style={{ background: '#A181FF', color: 'white' }}><Code size={20}/></div>
          <div className="stat-info">
            <p>Projects Completed</p>
            <h3>{data.stats.projectsCompleted}</h3>
            <span className="trend positive">+3 this month</span>
          </div>
        </div>
        <div className="stat-card" style={{ background: '#FCEEF5', border: '1px solid rgba(249, 143, 185, 0.2)' }}>
          <div className="icon-box" style={{ background: '#F98FB9', color: 'white' }}><Briefcase size={20}/></div>
          <div className="stat-info">
            <p>Years Experience</p>
            <h3>{data.stats.yearsExperience}</h3>
            <span className="trend positive">+1 this year</span>
          </div>
        </div>
        <div className="stat-card" style={{ background: '#FEF6EC', border: '1px solid rgba(247, 181, 101, 0.2)' }}>
          <div className="icon-box" style={{ background: '#F7B565', color: 'white' }}><Star size={20} fill="white"/></div>
          <div className="stat-info">
            <p>Happy Clients</p>
            <h3>{data.stats.happyClients}</h3>
            <span className="trend positive">+4 this month</span>
          </div>
        </div>
        <div className="stat-card" style={{ background: '#EEF6FE', border: '1px solid rgba(107, 181, 246, 0.2)' }}>
          <div className="icon-box" style={{ background: '#6BB5F6', color: 'white' }}><Award size={20}/></div>
          <div className="stat-info">
            <p>Certifications</p>
            <h3>{data.stats.certifications}</h3>
            <span className="trend positive">+1 this month</span>
          </div>
        </div>
      </section>
      </div>

      {/* Bottom Layout */}
      <div className="bottom-grid">
        
        {/* Projects */}
        {data.visibility.showProjects && (
          <section className="flex-col projects-section clay-card" style={{ boxShadow: 'none' }}>
            <div className="flex-row justify-between" style={{ marginBottom: '20px' }}>
              <h3 className="flex-row gap-2" style={{ fontSize: '16px' }}>
                <div className="title-icon-small" style={{ background: '#F4EFFF', padding: '6px', borderRadius: '8px' }}><Folder size={18} color="#A181FF"/></div> 
                My Projects
              </h3>
              <span className="view-all">View All</span>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div 
                className="projects-list" 
                ref={projectsRef} 
                style={{ 
                  display: 'flex', 
                  gap: '20px', 
                  paddingBottom: '16px', 
                  transition: 'transform 0.4s ease-in-out',
                  transform: `translateX(calc(-${currentProjectIndex * (100 / visibleCardsCount)}% - ${currentProjectIndex * (20 / visibleCardsCount)}px))`
                }}
              >
                {filteredProjects.length > 0 ? filteredProjects.map(proj => (
                  <div className="project-card" style={{ border: 'none', flex: `0 0 calc((100% - ${(visibleCardsCount - 1) * 20}px) / ${visibleCardsCount})`, padding: 0, overflow: 'hidden', background: 'white' }} key={proj.id}>
                    <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '140px', objectFit: 'cover', margin: 0, borderRadius: 0 }} />
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>{proj.title}</h4>
                      <p style={{ fontSize: '13px', color: '#716982', marginBottom: '16px' }}>{proj.desc}</p>
                      <div className="tags" style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {(proj.tags || []).map(tag => <span className="tag" key={tag} style={{ background: '#F1EBF9', color: '#5C5272', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '500' }}>{tag}</span>)}
                      </div>
                    </div>
                  </div>
                )) : <p style={{ fontSize: '13px', color: '#716982' }}>No projects found for "{searchQuery}"</p>}
              </div>
              
              {filteredProjects.length > visibleCardsCount && currentProjectIndex > 0 && (
                <button 
                  onClick={prevProjects}
                  style={{
                    position: 'absolute', left: '-16px', top: 'calc(50% - 8px)', transform: 'translateY(-50%)',
                    width: '32px', height: '32px', borderRadius: '50%', background: '#2563EB',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)', zIndex: 10
                  }}
                >
                  <ChevronLeft size={20} strokeWidth={3} />
                </button>
              )}

              {filteredProjects.length > visibleCardsCount && currentProjectIndex < maxProjectIndex && (
                <button 
                  onClick={nextProjects}
                  style={{
                    position: 'absolute', right: '-16px', top: 'calc(50% - 8px)', transform: 'translateY(-50%)',
                    width: '32px', height: '32px', borderRadius: '50%', background: '#2563EB',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)', zIndex: 10
                  }}
                >
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              )}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.visibility.showExperience && (
          <section className="flex-col experience-section clay-card" style={{ boxShadow: 'none' }}>
            <div className="flex-row justify-between" style={{ marginBottom: '20px' }}>
              <h3 className="flex-row gap-2" style={{ fontSize: '16px' }}>
                <div className="title-icon-small" style={{ background: '#FCEEF5', padding: '6px', borderRadius: '8px' }}><Briefcase size={18} color="#F98FB9"/></div>
                Experience
              </h3>
              <span className="view-all" style={{ color: '#F98FB9', background: '#FDE8F1' }}>View All</span>
            </div>
            <div className="timeline">
              {data.experience.map((exp) => (
                <div className="timeline-item" key={exp.id}>
                  <div className="timeline-dot" style={{ background: exp.color }}></div>
                  <div className="timeline-content">
                    <div className="flex-col">
                      <h4 style={{ fontSize: '13px', fontWeight: '600' }}>{exp.role}</h4>
                      <p style={{ fontSize: '11px', color: '#716982' }}>{exp.company}</p>
                      <span className="date">{exp.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Footer */}
      <footer className="footer-banner clay-purple-box flex-row justify-between" style={{ alignItems: 'center', padding: '16px 32px' }}>
        <div className="flex-row gap-4" style={{ alignItems: 'center' }}>
          <Star size={28} color="#F7B565" fill="#F7B565" style={{ filter: 'drop-shadow(0 4px 6px rgba(247,181,101,0.5))' }} />
          <div>
            <h4 style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: '500' }}>Thanks for visiting my portfolio! ✨</h4>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', margin: 0, marginTop: '2px' }}>Let's create something amazing together.</p>
          </div>
        </div>
        <button 
          className="btn back-to-top-btn" 
          onClick={scrollToTop}
        >
          <ChevronUp size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> Back to Top
        </button>
      </footer>
    </main>
  );
};

export default MainContent;
