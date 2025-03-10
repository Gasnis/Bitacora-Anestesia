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
  const [name, setName] = useState('');

  useEffect(() => {
    // Guardar el estado de autenticación en el localStorage
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = (isAuth, user) => {
    setIsAuthenticated(isAuth);
    setName(user);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home name={name} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
