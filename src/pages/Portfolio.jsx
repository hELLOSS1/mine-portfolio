import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import AboutMeContent from '../components/AboutMeContent';
import SkillsContent from '../components/SkillsContent';
import ProjectsContent from '../components/ProjectsContent';
import ExperienceContent from '../components/ExperienceContent';
import OtherContent from '../components/OtherContent';
import RightWidgets from '../components/RightWidgets';
import MobileView from '../components/MobileView';
import { usePortfolio } from '../context/PortfolioContext';

const Portfolio = () => {
  const { data, activeTab } = usePortfolio();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (isMobile) {
    return <MobileView />;
  }
  
  const isDashboard = activeTab === 'Dashboard';
  
  return (
    <div className={`portfolio-layout ${data.theme === 'dark' ? 'dark-theme' : ''} ${!isDashboard ? 'full-width-content' : ''}`}>
      <Sidebar />
      {isDashboard && <MainContent />}
      {activeTab === 'About Me' && <AboutMeContent />}
      {activeTab === 'Skills' && <SkillsContent />}
      {activeTab === 'Projects' && <ProjectsContent />}
      {activeTab === 'Experience' && <ExperienceContent />}
      {['Achievements', 'Contact Me', 'Resume', 'Blog'].includes(activeTab) && <OtherContent tab={activeTab} />}
      {isDashboard && <RightWidgets />}
    </div>
  );
};

export default Portfolio;
