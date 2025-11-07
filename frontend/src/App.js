import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('users');

  // 🔹 Verificar sesión al cargar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/verify', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setUser(JSON.parse(localStorage.getItem('user')));
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error verificando token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Cargando...</div>
      </div>
    );
  }

  // 🔹 Si no hay usuario logueado, mostrar login
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // 🔹 Si hay usuario, mostrar panel principal
  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <i className="logo">👥</i> User Management System
          </h1>
          <div className="user-info">
            <span>Bienvenido, {user.nombre}</span>
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="app-nav">
          <button
            className={`nav-button ${currentView === 'users' ? 'active' : ''}`}
            onClick={() => setCurrentView('users')}
          >
            📋 Gestión de Usuarios
          </button>
          <button
            className={`nav-button ${currentView === 'about' ? 'active' : ''}`}
            onClick={() => setCurrentView('about')}
          >
            ℹ️ Acerca de
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {currentView === 'users' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Panel de Administración de Usuarios</h2>
              <p>Gestiona los usuarios del sistema: crear, editar, ver y eliminar</p>
            </div>
            <UserList />
          </div>
        )}

        {currentView === 'about' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Acerca de la Aplicación</h2>
            </div>
            <div className="about-content">
              <div className="info-card">
                <h3>🚀 Tecnologías Utilizadas</h3>
                <ul>
                  <li><strong>Frontend:</strong> React.js, Axios, CSS3</li>
                  <li><strong>Backend:</strong> Node.js, Express.js</li>
                  <li><strong>Base de Datos:</strong> MySQL</li>
                  <li><strong>Características:</strong> CRUD Completo, Responsive Design</li>
                </ul>
              </div>

              <div className="info-card">
                <h3>📋 Funcionalidades</h3>
                <ul>
                  <li>✅ Crear nuevos usuarios</li>
                  <li>✅ Listar todos los usuarios</li>
                  <li>✅ Editar información</li>
                  <li>✅ Eliminar usuarios</li>
                  <li>✅ Validación de formularios</li>
                  <li>✅ Diseño responsive</li>
                </ul>
              </div>

              <div className="info-card">
                <h3>👥 Desarrollado por</h3>
                <p>Equipo de desarrollo - Reto React + MySQL</p>
                <p>🎯 Objetivo: Aplicación web full-stack</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; 2025 User Management System. Todos los derechos reservados.</p>
          <p className="footer-tech">
            Built with React ⚛️, Node.js 🟢, MySQL 🐬
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
