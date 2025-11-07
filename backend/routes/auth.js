const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'tu_clave_secreta_jwt'; // En producción usa variables de entorno

// Ruta de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar que se enviaron email y password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos'
      });
    }

    // Buscar usuario por email
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error en consulta:', err);
        return res.status(500).json({
          success: false,
          message: 'Error del servidor'
        });
      }

      // Verificar si el usuario existe
      if (results.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      const user = results[0];

      // Verificar contraseña (en producción usa bcrypt.compare)
      // Por ahora comparamos directamente para testing
      if (password === '123456') { // Contraseña por defecto
        // Generar token JWT
        const token = jwt.sign(
          { 
            id: user.id, 
            email: user.email, 
            rol: user.rol 
          },
          JWT_SECRET,
          { expiresIn: '24h' }
        );

        // Enviar respuesta exitosa
        res.json({
          success: true,
          message: 'Login exitoso',
          token,
          user: {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol
          }
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Ruta para verificar token
router.post('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token no proporcionado'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      success: true,
      user: decoded
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
});

module.exports = router;