import React from 'react';
import './RightWidgets.css';
import { MapPin, Mail, Calendar, GraduationCap, Globe, Send, User, Code2, MessageSquare } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const RightWidgets = () => {
  const { data } = usePortfolio();

  return (
    <aside className="right-widgets" style={{ overflowY: 'auto', paddingRight: '4px' }}>
      
      {/* About Me */}
      {data.visibility.showAboutMe && (
        <section className="widget-card clay-card mb-4">
          <h3 className="flex-row gap-2 mb-3" style={{ fontSize: '15px' }}>
            <div className="title-icon-small" style={{ background: '#F4EFFF', padding: '6px', borderRadius: '8px', boxShadow: 'var(--clay-white)' }}><User size={16} color="#A181FF"/></div> 
            About Me
          </h3>
          <p className="bio-text mb-4">
            {data.hero.bio}
          </p>
          <div className="info-list flex-col gap-4">
            <div className="info-item flex-row gap-4">
              <div className="info-icon-wrapper"><MapPin size={16} color="#F98FB9" /></div>
              <div className="info-text">
                <span className="label">Location</span>
                <span className="value">{data.aboutMe.location}</span>
              </div>
            </div>
            <div className="info-item flex-row gap-4">
              <div className="info-icon-wrapper"><Mail size={16} color="#F98FB9" /></div>
              <div className="info-text">
                <span className="label">Email</span>
                <span className="value">{data.aboutMe.email}</span>
              </div>
            </div>
            <div className="info-item flex-row gap-4">
              <div className="info-icon-wrapper"><Calendar size={16} color="#F98FB9" /></div>
              <div className="info-text">
                <span className="label">Age</span>
                <span className="value">{data.aboutMe.age}</span>
              </div>
            </div>
            <div className="info-item flex-row gap-4">
              <div className="info-icon-wrapper"><GraduationCap size={16} color="#F7B565" /></div>
              <div className="info-text">
                <span className="label">Education</span>
                <span className="value">{data.aboutMe.education.split(',').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {data.visibility.showSkills && (
        <section className="widget-card clay-card mb-4">
          <h3 className="flex-row gap-2 mb-3" style={{ fontSize: '15px' }}>
            <div className="title-icon-small" style={{ background: '#F4EFFF', padding: '6px', borderRadius: '8px', boxShadow: 'var(--clay-white)' }}><Code2 size={16} color="#A181FF"/></div> 
            Skills
          </h3>
          <div className="skills-list flex-col gap-4">
            {data.skills.map((skill, index) => (
              <SkillBar key={index} name={skill.name} percent={skill.percent} color={skill.color} />
            ))}
          </div>
        </section>
      )}

      {/* Connect */}
      <section className="widget-card clay-card connect-card">
        <h3 className="flex-row gap-2 mb-3" style={{ fontSize: '15px' }}>
          <div className="title-icon-small" style={{ background: '#F4EFFF', padding: '6px', borderRadius: '8px', boxShadow: 'var(--clay-white)' }}><MessageSquare size={16} color="#A181FF"/></div> 
          Let's Connect
        </h3>
        <p className="mb-4" style={{ color: '#716982', fontSize: '12px' }}>I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.</p>
        <div className="flex-row gap-3 mb-4">
          <div className="social-btn" style={{ background: '#181717', color: 'white', boxShadow: 'var(--clay-btn-white)' }}><Globe size={18}/></div>
          <div className="social-btn" style={{ background: '#0A66C2', color: 'white', boxShadow: 'var(--clay-btn-white)' }}><Globe size={18}/></div>
          <div className="social-btn" style={{ background: '#1DA1F2', color: 'white', boxShadow: 'var(--clay-btn-white)' }}><Globe size={18}/></div>
          <div className="social-btn" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: 'white', boxShadow: 'var(--clay-btn-white)' }}><Globe size={18}/></div>
        </div>
        <button className="btn w-100 flex-row gap-2 justify-center" style={{ background: '#A181FF', color: 'white', boxShadow: 'var(--clay-btn-purple)', border: 'none', borderRadius: 'var(--radius-sm)' }}>
          <Mail size={16}/> Send Message
        </button>
      </section>
      
    </aside>
  );
};

export default RightWidgets;

// Helper components for icons to match design
const UserIcon = () => (
  <div className="title-icon"><User size={16} color="#8E74E6"/></div>
);
const CodeIcon = () => (
  <div className="title-icon"><Code2 size={16} color="#8E74E6"/></div>
);
const SendIcon = () => (
  <div className="title-icon"><Send size={16} color="#8E74E6"/></div>
);

const SkillBar = ({ name, percent, color }) => (
  <div className="skill-bar-container">
    <div className="flex-row justify-between mb-2">
      <span className="skill-name">{name}</span>
      <span className="skill-percent">{percent}</span>
    </div>
    <div className="progress-bg neumorphic-inset-small">
      <div className="progress-fill" style={{ width: percent, background: color }}></div>
    </div>
  </div>
);
