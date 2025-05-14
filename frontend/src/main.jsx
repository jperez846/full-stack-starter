import './reset.css'
import './styles.css'

import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import BoardDetailPage from './BoardDetailsPage'
import Footer from './Footer';


function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  return (
    <Router>
      <header className="banner">
        <h1 className="banner-title">Kudos</h1>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>

      <div className="app-content">
        <h2 className="welcome-text">Give Kudos 🎉</h2>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/board/:id" element={<BoardDetailPage />} />
        </Routes>
      </div>
      <Footer></Footer>
    </Router>
  )
}

createRoot(document.getElementById('root')).render(
  <App />
)
