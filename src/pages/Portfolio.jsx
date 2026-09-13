import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import RightWidgets from '../components/RightWidgets';
import MobileView from '../components/MobileView';
import { usePortfolio } from '../context/PortfolioContext';

const Portfolio = () => {
  const { data } = usePortfolio();
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
  
  return (
    <div className={`portfolio-layout ${data.theme === 'dark' ? 'dark-theme' : ''}`}>
      <Sidebar />
      <MainContent />
      <RightWidgets />
    </div>
  );
};

export default Portfolio;
