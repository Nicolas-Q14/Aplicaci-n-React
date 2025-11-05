import React, { useState } from 'react';
import UserList from './components/UserList';
import './App.css'; // Asegúrate de crear este archivo CSS

function App() {
  const [currentView, setCurrentView] = useState('users');

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <i className="logo">👥</i>
            User Management System
          </h1>
          <p className="app-subtitle">
            Sistema de Gestión de Usuarios - React + MySQL + Node.js
          </p>
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
                  <li>✅ Ver detalles de usuario</li>
                  <li>✅ Editar información de usuarios</li>
                  <li>✅ Eliminar usuarios</li>
                  <li>✅ Validación de formularios</li>
                  <li>✅ Diseño responsive</li>
                </ul>
              </div>

              <div className="info-card">
                <h3>👥 Desarrollado por</h3>
                <p>Equipo de desarrollo - Reto React + MySQL</p>
                <p>🎯 Objetivo: Aplicación web completa full-stack</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; 2024 User Management System. Todos los derechos reservados.</p>
          <p className="footer-tech">
            Built with React ⚛️, Node.js 🟢, MySQL 🐬
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;