import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultDataJson from '../data/portfolio.json';
import avatarImg from '../assets/avatar_mia.jpg';
import plantImg from '../assets/3d_plant.jpg';
import taskflowImg from '../assets/taskflow.jpg';
import greenshopImg from '../assets/greenshop.jpg';
import weatherImg from '../assets/weatherapp.jpg';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

const API_URL = import.meta.env.VITE_API_URL || '';

// Use imported JSON but fallback to some defaults if missing (though it shouldn't be)
const defaultData = defaultDataJson || {};

// If there are static images that need to be resolved by Vite during build time,
// they would be imported here, but we'll rely on the JSON data strings or public URLs.
// Let's ensure the initial images are still resolved if they are the default ones.
if (defaultData.hero && defaultData.hero.avatarImg === '/src/assets/avatar_mia.jpg') {
  defaultData.hero.avatarImg = avatarImg;
}
if (defaultData.hero && defaultData.hero.plantImg === '/src/assets/3d_plant.jpg') {
  defaultData.hero.plantImg = plantImg;
}
if (defaultData.projects) {
  if (defaultData.projects[0] && defaultData.projects[0].img === '/src/assets/taskflow.jpg') defaultData.projects[0].img = taskflowImg;
  if (defaultData.projects[1] && defaultData.projects[1].img === '/src/assets/greenshop.jpg') defaultData.projects[1].img = greenshopImg;
  if (defaultData.projects[2] && defaultData.projects[2].img === '/src/assets/weatherapp.jpg') defaultData.projects[2].img = weatherImg;
}

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${API_URL}/api/portfolio`);
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
      [section]: [...(prev[section] || []), newItem]
    }));
  };

  const updateArrayItem = (section, identifier, updatedItem) => {
    setData(prev => ({
      ...prev,
      [section]: (prev[section] || []).map(item => (item.id || item.name) === identifier ? { ...item, ...updatedItem } : item)
    }));
  };

  const deleteArrayItem = (section, identifier) => {
    setData(prev => ({
      ...prev,
      [section]: (prev[section] || []).filter(item => (item.id || item.name) !== identifier)
    }));
  };

  const saveAllData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/portfolio/all`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (response.status === 401 || response.status === 403) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
      }
    } catch(err) {
      console.error("Failed to save data", err);
    }
  };

  const [activeTab, setActiveTab] = useState('Dashboard');

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#FAFAFA' }}>Loading...</div>;
  }

  return (
    <PortfolioContext.Provider value={{ data, updateData, updateRootData, toggleVisibility, addArrayItem, updateArrayItem, deleteArrayItem, saveAllData, activeTab, setActiveTab }}>
      {children}
    </PortfolioContext.Provider>
  );
};
