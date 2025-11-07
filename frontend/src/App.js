import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario logueado al cargar la app
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      // Verificar token con el backend
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/verify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(JSON.parse(localStorage.getItem('user')));
      } else {
        // Token inválido, limpiar localStorage
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

  return (
    <div className="App">
      {user ? (
        <div>
          <header className="app-header">
            <div className="header-content">
              <h1>React + MySQL Example</h1>
              <div className="user-info">
                <span>Bienvenido, {user.nombre}</span>
                <button onClick={handleLogout} className="logout-button">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </header>
          <UserList />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;