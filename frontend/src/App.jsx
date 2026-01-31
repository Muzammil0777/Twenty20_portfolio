import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
// Minimal global styles via App.css can be imported if exists, usually index.css handles it.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/portfolio" element={<Portfolio />} />
        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
