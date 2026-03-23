import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroPage from './pages/HeroPage';
import DetectorPage from './pages/DetectorPage';
import DashboardPage from './pages/DashboardPage';
import HowItWorksPage from './pages/HowItWorksPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [history, setHistory] = useState([]);

  const addToHistory = (result) => {
    setHistory(prev => [result, ...prev].slice(0, 20));
  };

  return (
    <>
      <div className="noise" />
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main style={{ position: 'relative', zIndex: 2 }}>
        {activePage === 'home' && <HeroPage setActivePage={setActivePage} />}
        {activePage === 'detect' && <DetectorPage addToHistory={addToHistory} />}
        {activePage === 'dashboard' && <DashboardPage history={history} />}
        {activePage === 'how' && <HowItWorksPage />}
      </main>
    </>
  );
}
