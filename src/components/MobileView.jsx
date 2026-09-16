import React, { useState } from 'react';
import './MobileView.css';
import { Moon, Sun, Home, Folder, Code2, User, MessageSquare, Search, Menu, Play, Download, MapPin, Mail, Phone, Crown, Filter, ChevronRight, Globe, Settings, BookOpen, GraduationCap, Target, Heart } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const MobileView = () => {
  const { data, updateRootData } = usePortfolio();
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');

  const renderHome = () => (
    <>
      <header className="mobile-header">
        <h2>Portfolio</h2>
        <div className="mobile-header-icons">
          <button className="mobile-icon-btn" onClick={() => updateRootData('theme', data.theme === 'dark' ? 'light' : 'dark')}>
            {data.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="mobile-icon-btn"><Menu size={20} /></button>
        </div>
      </header>

      <section className="mobile-hero-section">
        <div className="mobile-avatar-wrapper">
          <img src={data.hero.avatarImg} alt={data.hero.name} style={{ borderRadius: '0', objectFit: 'contain' }} />
        </div>
        <h1>I'm {data.hero.name}</h1>
        <p className="mobile-bio">{data.hero.role}</p>
        <div className="mobile-hero-buttons">
          <button className="mobile-btn mobile-btn-primary" onClick={() => setActiveTab('Projects')}><Play size={16} fill="white" /> View My Work</button>
          <button className="mobile-btn mobile-btn-white" onClick={() => { if(data.hero.resumePdf) window.open(data.hero.resumePdf, '_blank'); else alert('No CV available yet!'); }}><Download size={16} /> Download CV</button>
        </div>
      </section>

      <section className="mobile-stats-grid">
        <div className="mobile-stat-card" style={{ background: 'var(--bg-color)' }}>
          <div className="mobile-stat-icon-wrapper" style={{ background: 'var(--primary)' }}><Code2 size={20} /></div>
          <h3 className="mobile-stat-value">{data.stats.projectsCompleted}</h3>
          <p className="mobile-stat-label">Projects</p>
        </div>
        <div className="mobile-stat-card" style={{ background: 'var(--bg-color)' }}>
          <div className="mobile-stat-icon-wrapper" style={{ background: '#F98FB9' }}><Folder size={20} /></div>
          <h3 className="mobile-stat-value">{data.stats.yearsExperience}</h3>
          <p className="mobile-stat-label">Years Exp.</p>
        </div>
        <div className="mobile-stat-card" style={{ background: 'var(--bg-color)' }}>
          <div className="mobile-stat-icon-wrapper" style={{ background: '#F7B565' }}><User size={20} /></div>
          <h3 className="mobile-stat-value">{data.stats.happyClients}</h3>
          <p className="mobile-stat-label">Happy Clients</p>
        </div>
        <div className="mobile-stat-card" style={{ background: 'var(--bg-color)' }}>
          <div className="mobile-stat-icon-wrapper" style={{ background: '#6BB5F6' }}><Crown size={20} /></div>
          <h3 className="mobile-stat-value">{data.stats.certifications}</h3>
          <p className="mobile-stat-label">Certifications</p>
        </div>
      </section>
    </>
  );

  const renderProjects = () => {
    const filteredProjects = data.projects?.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase())) || [];
    const featuredProject = filteredProjects[0];
    const otherProjects = filteredProjects.slice(1);

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
            <div className="mobile-featured-project" onClick={() => { if(featuredProject.url || featuredProject.github) window.open(featuredProject.url || featuredProject.github, '_blank'); }}>
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
              <div className="mobile-project-item" key={proj.id} onClick={() => { if(proj.url || proj.github) window.open(proj.url || proj.github, '_blank'); }}>
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
        {data.skillCategories?.map((category) => {
          const categorySkills = data.skills?.filter(s => s.category === category.name) || [];
          if (categorySkills.length === 0) return null;

          return (
            <div className="mobile-skills-category" key={category.id}>
              <h3>{category.name}</h3>
              <div className="mobile-skills-grid">
                {categorySkills.map((skill, index) => (
                  <div className="mobile-skill-item" key={index} style={{ background: skill.color ? skill.color.replace('linear-gradient(90deg, ', '').split(',')[0] + '33' : '#F4EFFF', color: skill.color ? skill.color.replace('linear-gradient(90deg, ', '').split(',')[0] : '#9C81F2' }}>
                    <Code2 size={24} />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
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
        
        <div className="mobile-contact-item" style={{ background: 'linear-gradient(90deg, #9C81F2 0%, #B8A1FF 100%)', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => window.location.href = `mailto:${data.aboutMe?.email || ''}`}>
          <div className="mobile-contact-item-left">
            <div className="mobile-contact-icon" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
              <Mail size={20} />
            </div>
            <div className="mobile-contact-text">
              <h4 style={{ color: 'white' }}>Email Me</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>{data.aboutMe?.email}</p>
            </div>
          </div>
          <ChevronRight size={20} color="white" />
        </div>

        <div className="mobile-contact-item" style={{ cursor: 'pointer' }} onClick={() => window.location.href = `tel:${data.aboutMe?.phone || '+919876543210'}`}>
          <div className="mobile-contact-item-left">
            <div className="mobile-contact-icon">
              <Phone size={20} />
            </div>
            <div className="mobile-contact-text">
              <h4>Call Me</h4>
              <p>{data.aboutMe?.phone || '+91 98765 43210'}</p>
            </div>
          </div>
          <ChevronRight size={20} color="#A19BAE" />
        </div>

        <div className="mobile-contact-item" style={{ cursor: 'pointer' }} onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(data.aboutMe?.location || '')}`, '_blank')}>
          <div className="mobile-contact-item-left">
            <div className="mobile-contact-icon">
              <MapPin size={20} />
            </div>
            <div className="mobile-contact-text">
              <h4>Location</h4>
              <p>{data.aboutMe?.location}</p>
            </div>
          </div>
          <ChevronRight size={20} color="#A19BAE" />
        </div>

        <div style={{ textAlign: 'center', margin: '12px 0' }}>
          <span style={{ fontSize: '11px', color: '#A19BAE', textTransform: 'uppercase', letterSpacing: '1px' }}>Or connect with me</span>
        </div>

        <div className="mobile-socials">
          {data.socialLinks?.map((social, index) => (
            <button key={index} className="mobile-social-btn" style={{ color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => window.open(social.url, '_blank')} title={social.platform}>
              <Globe size={20} />
            </button>
          ))}
        </div>

        <button className="mobile-hire-me-btn" style={{ cursor: 'pointer' }} onClick={() => window.location.href = `mailto:${data.aboutMe?.email || ''}?subject=Hire Me`}>
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

      <div className="mobile-purple-overlap">
        <div className="mobile-about-card">
          <h3 style={{ fontSize: '16px', color: 'var(--text-dark)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--bg-color)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
              <User size={18} color="#A181FF"/>
            </div>
            Introduction
          </h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)', margin: 0 }}>{data.aboutMe?.description || data.hero?.bio}</p>
        </div>
      </div>

      <div className="mobile-about-card" style={{ margin: '0 20px 20px' }}>
        <h3 style={{ fontSize: '16px', color: 'var(--text-dark)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'var(--bg-color)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
            <BookOpen size={18} color="#F98FB9"/>
          </div>
          My Background
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)', margin: 0 }}>{data.aboutMe?.background}</p>
      </div>

      <div className="mobile-about-card" style={{ margin: '0 20px 20px' }}>
        <h3 style={{ fontSize: '16px', color: 'var(--text-dark)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'var(--bg-color)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
            <GraduationCap size={18} color="#F7B565"/>
          </div>
          Education
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)', margin: 0 }}>{data.aboutMe?.education}</p>
      </div>

      <div className="mobile-about-card" style={{ margin: '0 20px 20px' }}>
        <h3 style={{ fontSize: '16px', color: 'var(--text-dark)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'var(--bg-color)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
            <Target size={18} color="#6BB5F6"/>
          </div>
          Career Goals
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)', margin: 0 }}>{data.aboutMe?.careerGoals}</p>
      </div>

      <div className="mobile-about-card" style={{ margin: '0 20px 20px' }}>
        <h3 style={{ fontSize: '16px', color: 'var(--text-dark)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'var(--bg-color)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
            <Heart size={18} color="#8E74E6"/>
          </div>
          Interests
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)', margin: 0 }}>{data.aboutMe?.interests}</p>
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
