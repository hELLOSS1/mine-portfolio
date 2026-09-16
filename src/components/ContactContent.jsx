import React, { useRef } from 'react';
import './MainContent.css';
import { Moon, Sun, ChevronUp, Mail, User, Code, Code2, Link2, Send, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ContactContent = () => {
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

  const allLinks = [];
  if (data?.aboutMe?.email) {
    allLinks.push({
      id: 'email',
      platform: 'Email',
      url: data.aboutMe.email,
      isEmail: true,
      color: '#F4EFFF',
      iconColor: '#A181FF'
    });
  }
  
  if (data?.socialLinks) {
    data.socialLinks.forEach(link => {
      let Icon = Link2;
      let iconColor = '#A181FF';
      let bgColor = '#F4EFFF';
      
      if (link.platform.toLowerCase() === 'linkedin') {
        Icon = User;
        iconColor = '#6BB5F6';
        bgColor = '#E3F2FD';
      } else if (link.platform.toLowerCase() === 'github') {
        Icon = Code;
        iconColor = '#27272A';
        bgColor = '#F4F4F5';
      } else if (link.platform.toLowerCase() === 'leetcode') {
        Icon = Code2;
        iconColor = '#F7B565';
        bgColor = '#FEF6EC';
      } else if (link.platform.toLowerCase() === 'twitter') {
        Icon = Code;
        iconColor = '#1DA1F2';
        bgColor = '#E1F5FE';
      }
      
      allLinks.push({
        ...link,
        Icon,
        iconColor,
        bgColor
      });
    });
  }

  return (
    <main className="main-content flex-col" ref={mainRef}>
      <div className="top-content-card">
        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '24px', color: 'var(--text-dark)', fontWeight: 'bold', marginBottom: '8px' }}>Contact Me</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Feel free to reach out for collaboration, project or just a friendly chat!</p>
            <div style={{ width: '40px', height: '4px', background: 'linear-gradient(90deg, var(--primary) 0%, rgba(161, 129, 255, 0.2) 100%)', borderRadius: '2px', marginTop: '12px' }}></div>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Let's Connect Card */}
            <div className="clay-card" style={{ background: 'var(--card-bg)', padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
               <div style={{ flexShrink: 0, width: '100px', height: '100px', background: '#F4EFFF', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Mail size={48} color="var(--primary)" />
               </div>
               <div>
                 <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '12px' }}>Let's Connect</h3>
                 <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                   I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out through any of the channels below or send me a message.
                 </p>
               </div>
            </div>

            {/* Social Links Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {allLinks.map((link, index) => {
                const IconComponent = link.isEmail ? Mail : link.Icon;
                return (
                  <a href={link.isEmail ? `mailto:${link.url}` : link.url} target="_blank" rel="noreferrer" key={index} className="clay-card" style={{ background: 'var(--card-bg)', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', transition: 'transform 0.2s', boxShadow: 'none', border: '1px solid var(--border-color, rgba(161, 129, 255, 0.1))' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: link.bgColor || '#F4EFFF', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconComponent size={18} color={link.iconColor || 'var(--primary)'} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-dark)' }}>{link.platform}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.isEmail ? link.url : link.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
                      </div>
                    </div>
                    <ArrowRight size={14} color="var(--primary)" />
                  </a>
                );
              })}
            </div>

            {/* Follow Me Card */}
            <div className="clay-card" style={{ background: 'var(--card-bg)', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                 <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '4px' }}>Follow Me</h4>
                 <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Stay connected for updates, new projects and more!</p>
               </div>
               <div style={{ display: 'flex', gap: '8px' }}>
                 {allLinks.map((link, idx) => {
                   const IconComponent = link.isEmail ? Mail : link.Icon;
                   return (
                     <a href={link.isEmail ? `mailto:${link.url}` : link.url} target="_blank" rel="noreferrer" key={idx} style={{ background: '#F4EFFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <IconComponent size={14} color="var(--primary)" />
                     </a>
                   );
                 })}
               </div>
            </div>

          </div>

          {/* Right Column: Form */}
          <div className="clay-card" style={{ background: 'var(--card-bg)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
               <div style={{ background: '#F4EFFF', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Send size={24} color="var(--primary)" />
               </div>
               <div>
                 <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '4px' }}>Send Me a Message</h3>
                 <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Fill out the form below and I'll get back to you as soon as possible.</p>
               </div>
             </div>

             <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
               <div style={{ display: 'flex', gap: '20px' }}>
                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-dark)' }}>Name *</label>
                   <input type="text" placeholder="Your name" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-dark)', fontSize: '13px' }} required />
                 </div>
                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-dark)' }}>Email *</label>
                   <input type="email" placeholder="you@example.com" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-dark)', fontSize: '13px' }} required />
                 </div>
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                 <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-dark)' }}>Subject</label>
                 <select style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-dark)', fontSize: '13px' }}>
                   <option>What is this regarding?</option>
                   <option>Freelance Project</option>
                   <option>Job Opportunity</option>
                   <option>Just saying hi!</option>
                 </select>
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                 <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-dark)' }}>Message *</label>
                 <textarea placeholder="Your message here..." style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-dark)', fontSize: '13px', minHeight: '120px', resize: 'vertical' }} required></textarea>
               </div>

               <button type="submit" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '8px' }}>
                 <Send size={16} /> Send Message
               </button>
             </form>
          </div>

        </div>

      </div>

      <footer className="footer-banner clay-purple-box flex-row justify-between" style={{ alignItems: 'center', padding: '16px 32px', marginTop: '20px' }}>
        <div className="flex-row gap-4" style={{ alignItems: 'center' }}>
          <div>
            <h4 style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: '500' }}>Looking forward to hearing from you!</h4>
          </div>
        </div>
        <button className="btn back-to-top-btn" onClick={scrollToTop}>
          <ChevronUp size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> Back to Top
        </button>
      </footer>
    </main>
  );
};

export default ContactContent;
