import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Leer el estado de autenticación desde el localStorage
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true';
  });

  useEffect(() => {
    // Guardar el estado de autenticación en el localStorage
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={setIsAuthenticated} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
