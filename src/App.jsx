import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
