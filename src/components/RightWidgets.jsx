import React from 'react';
import './RightWidgets.css';
import { Send, Mail, User, Code, Code2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const RightWidgets = () => {
  return (
    <aside className="right-widgets" style={{ overflowY: 'auto', paddingRight: '4px', height: '100%' }}>
      
      <section className="widget-card clay-card flex-col" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h3 className="flex-row gap-2 mb-3" style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary)', marginBottom: '16px' }}>
          <div className="title-icon-small" style={{ background: '#F4EFFF', padding: '6px', borderRadius: '8px', boxShadow: 'var(--clay-white)' }}>
            <Send size={18} color="#A181FF"/>
          </div> 
          Let's Connect
        </h3>
        
        <p className="mb-6" style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '24px' }}>
          Feel free to reach out for collaboration, projects or just a friendly chat!
        </p>
        
        <div className="info-list flex-col gap-6" style={{ flex: 1, gap: '24px' }}>
          <div className="info-item flex-row gap-4" style={{ alignItems: 'center' }}>
            <div className="info-icon-wrapper" style={{ background: '#F4EFFF', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={18} color="#A181FF" />
            </div>
            <div className="info-text flex-col">
              <span className="label" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)' }}>Email</span>
              <a href="mailto:writestoashish@gmail.com" className="value" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>writestoashish@gmail.com</a>
            </div>
          </div>
          
          <div className="info-item flex-row gap-4" style={{ alignItems: 'center' }}>
            <div className="info-icon-wrapper" style={{ background: '#EEF6FE', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={18} color="#6BB5F6" />
            </div>
            <div className="info-text flex-col">
              <span className="label" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)' }}>LinkedIn</span>
              <a href="https://linkedin.com/in/ashish-gupta-a31455304/" target="_blank" rel="noreferrer" className="value" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>linkedin.com/in/ashish-gupta-a31455304/</a>
            </div>
          </div>
          
          <div className="info-item flex-row gap-4" style={{ alignItems: 'center' }}>
            <div className="info-icon-wrapper" style={{ background: '#F4F4F5', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code size={18} color="#27272A" />
            </div>
            <div className="info-text flex-col">
              <span className="label" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)' }}>GitHub</span>
              <a href="https://github.com/SANDIPstar" target="_blank" rel="noreferrer" className="value" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>github.com/SANDIPstar</a>
            </div>
          </div>
          
          <div className="info-item flex-row gap-4" style={{ alignItems: 'center' }}>
            <div className="info-icon-wrapper" style={{ background: '#FEF6EC', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code2 size={18} color="#F7B565" />
            </div>
            <div className="info-text flex-col">
              <span className="label" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-dark)' }}>LeetCode</span>
              <a href="https://leetcode.com/u/Ashish_Gupta1/" target="_blank" rel="noreferrer" className="value" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>leetcode.com/u/Ashish_Gupta1/</a>
            </div>
          </div>
        </div>

        <div className="bottom-connect mt-6 pt-6" style={{ borderTop: '1px dashed rgba(161, 129, 255, 0.2)', marginTop: '48px', paddingTop: '24px', position: 'relative' }}>
          <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '16px', fontStyle: 'italic', fontFamily: 'cursive' }}>
            Let's build something<br/>great together! 🚀
          </p>
          <div style={{ position: 'absolute', right: '10px', bottom: '0px', opacity: 0.6 }}>
            <svg width="80" height="60" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 30 Q 30 45 45 20" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              <path d="M42 17 L 55 10 L 48 23 Z" fill="var(--primary)" />
            </svg>
          </div>
        </div>
        
      </section>
      
    </aside>
  );
};

export default RightWidgets;
