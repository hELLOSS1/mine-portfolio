import React, { useState } from 'react';
import './MobileView.css';
import { Home, Folder, Code2, User, MessageSquare, Search, Menu, Play, Download, MapPin, Mail, Phone, Crown, Filter, ChevronRight, Globe, Settings } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const MobileView = () => {
  const { data } = usePortfolio();
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');

  const renderHome = () => (
    <>
      <header className="mobile-header">
        <h2>Portfolio</h2>
        <div className="mobile-header-icons">
          <button className="mobile-icon-btn"><Search size={20} /></button>
          <button className="mobile-icon-btn"><Menu size={20} /></button>
        </div>
      </header>

      <section className="mobile-hero-section">
        <div className="mobile-avatar-wrapper">
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(data.hero.name)}&background=9C81F2&color=fff&size=128`} alt={data.hero.name} style={{ borderRadius: '50%' }} />
        </div>
        <h1>I'm {data.hero.name}</h1>
        <p className="mobile-bio">{data.hero.role}</p>
        <div className="mobile-hero-buttons">
          <button className="mobile-btn mobile-btn-primary"><Play size={16} fill="white" /> View My Work</button>
          <button className="mobile-btn mobile-btn-white"><Download size={16} /> Download CV</button>
        </div>
      </section>

      <section className="mobile-stats-grid">
        <div className="mobile-stat-card" style={{ background: '#F4EFFF' }}>
          <div className="mobile-stat-icon-wrapper" style={{ background: '#A181FF' }}><Code2 size={20} /></div>
          <h3 className="mobile-stat-value">{data.stats.projectsCompleted}</h3>
          <p className="mobile-stat-label">Projects</p>
        </div>
        <div className="mobile-stat-card" style={{ background: '#FCEEF5' }}>
          <div className="mobile-stat-icon-wrapper" style={{ background: '#F98FB9' }}><Folder size={20} /></div>
          <h3 className="mobile-stat-value">{data.stats.yearsExperience}</h3>
          <p className="mobile-stat-label">Years Exp.</p>
        </div>
        <div className="mobile-stat-card" style={{ background: '#FEF6EC' }}>
          <div className="mobile-stat-icon-wrapper" style={{ background: '#F7B565' }}><User size={20} /></div>
          <h3 className="mobile-stat-value">{data.stats.happyClients}</h3>
          <p className="mobile-stat-label">Happy Clients</p>
        </div>
        <div className="mobile-stat-card" style={{ background: '#EEF6FE' }}>
          <div className="mobile-stat-icon-wrapper" style={{ background: '#6BB5F6' }}><Crown size={20} /></div>
          <h3 className="mobile-stat-value">{data.stats.certifications}</h3>
          <p className="mobile-stat-label">Certifications</p>
        </div>
      </section>
    </>
  );

  const renderProjects = () => {
    const featuredProject = data.projects[0];
    const otherProjects = data.projects.slice(1);

    return (
      <>
        <div className="mobile-purple-header" style={{ paddingBottom: '40px' }}>
          <h1>My Projects</h1>
          <p>Some of my recent work</p>
          
          <div className="mobile-search-bar">
            <div className="mobile-search-input-wrapper">
              <Search size={20} color="#716982" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="mobile-search-filter-btn">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="mobile-purple-overlap" style={{ marginTop: '-20px' }}>
          {featuredProject && (
            <div className="mobile-featured-project">
              <img src={featuredProject.img} alt={featuredProject.title} />
              <div className="mobile-featured-overlay">
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', alignSelf: 'flex-start', marginBottom: '8px' }}>Featured</span>
                <h3>{featuredProject.title}</h3>
                <p>{featuredProject.desc}</p>
                <div className="mobile-featured-tags">
                  {featuredProject.tags.map(tag => <span key={tag}>{tag}</span>)}
                  <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.3)', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mobile-project-list" style={{ marginTop: '24px' }}>
            <div className="mobile-project-list-header">
              <h3>All Projects</h3>
              <span>View All</span>
            </div>
            
            {otherProjects.map(proj => (
              <div className="mobile-project-item" key={proj.id}>
                <img src={proj.img} alt={proj.title} className="mobile-project-item-img" />
                <div className="mobile-project-item-info">
                  <h4>{proj.title}</h4>
                  <p>{proj.desc}</p>
                  <div className="mobile-project-item-tags">
                    {proj.tags.slice(0, 2).map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                <ChevronRight size={20} color="#A19BAE" />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderSkills = () => (
    <>
      <div className="mobile-purple-header">
        <h1>Skills</h1>
        <p>Technologies I work with</p>
      </div>

      <div className="mobile-purple-overlap mobile-skills-card">
        <div className="mobile-skills-category">
          <h3>Frontend</h3>
          <div className="mobile-skills-grid">
            <div className="mobile-skill-item" style={{ background: '#EEF6FE', color: '#6BB5F6' }}>
              <Code2 size={24} />
              <span>React</span>
            </div>
            <div className="mobile-skill-item" style={{ background: '#FCEEF5', color: '#F98FB9' }}>
              <Code2 size={24} />
              <span>HTML</span>
            </div>
            <div className="mobile-skill-item" style={{ background: '#F4EFFF', color: '#9C81F2' }}>
              <Code2 size={24} />
              <span>CSS</span>
            </div>
            <div className="mobile-skill-item" style={{ background: '#FEF6EC', color: '#F7B565' }}>
              <Code2 size={24} />
              <span>JavaScript</span>
            </div>
            <div className="mobile-skill-item" style={{ background: '#E0F7FA', color: '#26C6DA' }}>
              <Code2 size={24} />
              <span>Tailwind CSS</span>
            </div>
          </div>
        </div>

        <div className="mobile-skills-category">
          <h3>Backend</h3>
          <div className="mobile-skills-grid">
            <div className="mobile-skill-item" style={{ background: '#E8F5E9', color: '#66BB6A' }}>
              <Settings size={24} />
              <span>Node.js</span>
            </div>
            <div className="mobile-skill-item" style={{ background: '#F3E5F5', color: '#AB47BC' }}>
              <Settings size={24} />
              <span>Express.js</span>
            </div>
            <div className="mobile-skill-item" style={{ background: '#FFEBEE', color: '#EF5350' }}>
              <Settings size={24} />
              <span>Java</span>
            </div>
          </div>
        </div>

        <div className="mobile-skills-category">
          <h3>Database</h3>
          <div className="mobile-skills-grid">
            <div className="mobile-skill-item" style={{ background: '#E8F5E9', color: '#66BB6A' }}>
              <Folder size={24} />
              <span>MongoDB</span>
            </div>
            <div className="mobile-skill-item" style={{ background: '#E1F5FE', color: '#29B6F6' }}>
              <Folder size={24} />
              <span>MySQL</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderContact = () => (
    <>
      <div className="mobile-purple-header">
        <h1>Let's Work Together</h1>
        <p>Have a project in mind or just want to say hi? I'm always open to new opportunities!</p>
      </div>

      <div className="mobile-purple-overlap mobile-contact-card">
        
        <div className="mobile-contact-item" style={{ background: 'linear-gradient(90deg, #9C81F2 0%, #B8A1FF 100%)', color: 'white', border: 'none' }}>
          <div className="mobile-contact-item-left">
            <div className="mobile-contact-icon" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
              <Mail size={20} />
            </div>
            <div className="mobile-contact-text">
              <h4 style={{ color: 'white' }}>Email Me</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>{data.aboutMe.email}</p>
            </div>
          </div>
          <ChevronRight size={20} color="white" />
        </div>

        <div className="mobile-contact-item">
          <div className="mobile-contact-item-left">
            <div className="mobile-contact-icon">
              <Phone size={20} />
            </div>
            <div className="mobile-contact-text">
              <h4>Call Me</h4>
              <p>+91 98765 43210</p>
            </div>
          </div>
          <ChevronRight size={20} color="#A19BAE" />
        </div>

        <div className="mobile-contact-item">
          <div className="mobile-contact-item-left">
            <div className="mobile-contact-icon">
              <MapPin size={20} />
            </div>
            <div className="mobile-contact-text">
              <h4>Location</h4>
              <p>{data.aboutMe.location}</p>
            </div>
          </div>
          <ChevronRight size={20} color="#A19BAE" />
        </div>

        <div style={{ textAlign: 'center', margin: '12px 0' }}>
          <span style={{ fontSize: '11px', color: '#A19BAE', textTransform: 'uppercase', letterSpacing: '1px' }}>Or connect with me</span>
        </div>

        <div className="mobile-socials">
          <button className="mobile-social-btn" style={{ color: '#333' }}><Globe size={20} /></button>
          <button className="mobile-social-btn" style={{ color: '#0A66C2' }}><Globe size={20} /></button>
          <button className="mobile-social-btn" style={{ color: '#1DA1F2' }}><Globe size={20} /></button>
        </div>

        <button className="mobile-hire-me-btn">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
             <div style={{ background: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Crown size={20} color="white" />
             </div>
             <div>
               <h4>Hire Me</h4>
               <p>Let's work together</p>
             </div>
          </div>
          <ChevronRight size={20} color="white" />
        </button>

      </div>
    </>
  );

  const renderAbout = () => (
    <>
      <div className="mobile-purple-header">
        <h1>About Me</h1>
        <p>A little bit about my background.</p>
      </div>

      <div className="mobile-purple-overlap mobile-about-card">
        <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#5C5272' }}>
          {data.hero.bio}
        </p>

        <div className="mobile-about-item" style={{ marginTop: '16px' }}>
          <div className="mobile-about-item-icon"><MapPin size={20} /></div>
          <div className="mobile-about-item-text">
            <h4>LOCATION</h4>
            <p>{data.aboutMe.location}</p>
          </div>
        </div>

        <div className="mobile-about-item">
          <div className="mobile-about-item-icon"><Mail size={20} /></div>
          <div className="mobile-about-item-text">
            <h4>EMAIL</h4>
            <p>{data.aboutMe.email}</p>
          </div>
        </div>

        <div className="mobile-about-item">
          <div className="mobile-about-item-icon"><User size={20} /></div>
          <div className="mobile-about-item-text">
            <h4>AGE</h4>
            <p>{data.aboutMe.age}</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="mobile-view-container">
      {activeTab === 'Home' && renderHome()}
      {activeTab === 'Projects' && renderProjects()}
      {activeTab === 'Skills' && renderSkills()}
      {activeTab === 'Contact' && renderContact()}
      {activeTab === 'About' && renderAbout()}

      <nav className="mobile-bottom-nav">
        <div className={`mobile-nav-item ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}>
          <Home size={20} />
          <span>Home</span>
        </div>
        <div className={`mobile-nav-item ${activeTab === 'Projects' ? 'active' : ''}`} onClick={() => setActiveTab('Projects')}>
          <Folder size={20} />
          <span>Projects</span>
        </div>
        <div className={`mobile-nav-item ${activeTab === 'Skills' ? 'active' : ''}`} onClick={() => setActiveTab('Skills')}>
          <Code2 size={20} />
          <span>Skills</span>
        </div>
        <div className={`mobile-nav-item ${activeTab === 'About' ? 'active' : ''}`} onClick={() => setActiveTab('About')}>
          <User size={20} />
          <span>About</span>
        </div>
        <div className={`mobile-nav-item ${activeTab === 'Contact' ? 'active' : ''}`} onClick={() => setActiveTab('Contact')}>
          <MessageSquare size={20} />
          <span>Contact</span>
        </div>
      </nav>
    </div>
  );
};

export default MobileView;
