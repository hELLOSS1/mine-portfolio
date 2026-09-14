import React, { createContext, useContext, useState, useEffect } from 'react';
import avatarImg from '../assets/avatar_mia.jpg';
import plantImg from '../assets/3d_plant.jpg';
import taskflowImg from '../assets/taskflow.jpg';
import greenshopImg from '../assets/greenshop.jpg';
import weatherImg from '../assets/weatherapp.jpg';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

const defaultData = {
  theme: 'light',
  hero: {
    name: 'Mia',
    role: 'Full Stack Developer',
    bio: 'I build beautiful, responsive and user-friendly web applications with modern technologies.',
    avatarImg,
    plantImg
  },
  stats: {
    projectsCompleted: '18',
    yearsExperience: '2+',
    happyClients: '12',
    certifications: '6'
  },
  projects: [
    { id: 1, title: 'TaskFlow', desc: 'A productivity tool for team collaboration.', img: taskflowImg, tags: ['React', 'Node.js', 'MongoDB'] },
    { id: 2, title: 'GreenShop', desc: 'E-commerce website for plants & pots.', img: greenshopImg, tags: ['React', 'Stripe', 'Tailwind'] },
    { id: 3, title: 'Weather App', desc: 'Real-time weather forecast application.', img: weatherImg, tags: ['JavaScript', 'API', 'CSS'] }
  ],
  experience: [
    { id: 1, role: 'Frontend Developer', company: 'Tech Solutions Pvt. Ltd.', date: 'Mar 2023 - Present', color: '#F7B565' },
    { id: 2, role: 'Web Developer Intern', company: 'CodeCraft Labs', date: 'Jun 2022 - Feb 2023', color: '#8E74E6' },
    { id: 3, role: 'Freelance Developer', company: 'Self Employed', date: 'Jan 2021 - May 2022', color: '#8E74E6' }
  ],
  certificates: [
    { id: 1, name: 'React.js', color: '#F4EFFF' },
    { id: 2, name: 'Node.js', color: '#E8F5E9' },
    { id: 3, name: 'MongoDB', color: '#EEF6FE' },
    { id: 4, name: 'Tailwind CSS', color: '#FCEEF5' },
  ],
  socialLinks: [
    { id: 1, platform: 'GitHub', url: 'https://github.com', color: '#F4EFFF' },
    { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com', color: '#EEF6FE' },
    { id: 3, platform: 'Twitter', url: 'https://twitter.com', color: '#FCEEF5' },
  ],
  aboutMe: {
    location: 'India',
    email: 'mia.dev@email.com',
    age: '22',
    education: 'B.Tech in CSE, Parul University'
  },
  skills: [
    { name: 'HTML / CSS', percent: '90%', color: 'linear-gradient(90deg, #A890F0, #8E74E6)' },
    { name: 'JavaScript', percent: '85%', color: 'linear-gradient(90deg, #F98FB9, #F672A7)' },
    { name: 'React.js', percent: '80%', color: 'linear-gradient(90deg, #F7B565, #F59E3D)' },
    { name: 'Node.js', percent: '75%', color: 'linear-gradient(90deg, #76D89D, #5DBE84)' },
    { name: 'MongoDB', percent: '70%', color: 'linear-gradient(90deg, #6BB5F6, #4EA1F0)' },
    { name: 'Tailwind CSS', percent: '85%', color: 'linear-gradient(90deg, #A890F0, #8E74E6)' }
  ],
  visibility: {
    showProjects: true,
    showExperience: true,
    showAboutMe: true,
    showSkills: true
  }
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (response.ok) {
          const dbData = await response.json();
          if (Object.keys(dbData).length > 0) {
             setData(dbData);
          }
        }
      } catch (err) {
        console.error("Failed to fetch portfolio data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  useEffect(() => {
    if (data.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [data.theme]);

  const updateData = (section, updates) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates
      }
    }));
  };

  const updateRootData = (key, value) => {
    setData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleVisibility = (section) => {
    const newVisibility = { ...data.visibility, [section]: !data.visibility[section] };
    setData(prev => ({
      ...prev,
      visibility: newVisibility
    }));
  };

  const addArrayItem = (section, item) => {
    const newItem = { ...item, id: Date.now() };
    setData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const updateArrayItem = (section, id, updatedItem) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map(item => item.id === id ? { ...item, ...updatedItem } : item)
    }));
  };

  const deleteArrayItem = (section, id) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const saveAllData = async () => {
    try {
      await fetch('/api/portfolio/all', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch(err) {
      console.error("Failed to save data", err);
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#FAFAFA' }}>Loading...</div>;
  }

  return (
    <PortfolioContext.Provider value={{ data, updateData, updateRootData, toggleVisibility, addArrayItem, updateArrayItem, deleteArrayItem, saveAllData }}>
      {children}
    </PortfolioContext.Provider>
  );
};
