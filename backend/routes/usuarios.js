const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET - Obtener todos los usuarios
router.get('/', (req, res) => {
    const query = 'SELECT * FROM usuarios ORDER BY id DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({
                error: 'Error al obtener usuarios',
                details: err.message
            });
        }
        res.json(results);
    });
});
router.get('/', (req, res) => {
    const query = 'SELECT * FROM usuarios where email = ? and password = ?';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({
                error: 'Error al obtener usuarios',
                details: err.message
            });
        }
        res.json(results);
    });
});

// GET - Obtener un usuario por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener usuario:', err);
            return res.status(500).json({
                error: 'Error al obtener usuario',
                details: err.message
            });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(results[0]);
    });
});

// POST - Crear nuevo usuario
router.post('/', (req, res) => {
    const { nombre, email, telefono } = req.body;
    
    // Validaciones básicas
    if (!nombre || !email) {
        return res.status(400).json({ error: 'Nombre y email son obligatorios' });
    }

    const query = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
    
    db.query(query, [nombre, email, telefono], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'El email ya está registrado' });
            }
            console.error('Error al crear usuario:', err);
            return res.status(500).json({
                error: 'Error al crear usuario',
                details: err.message
            });
        }
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            id: results.insertId
        });
    });
});

// PUT - Actualizar usuario
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
    
    if (!nombre || !email) {
        return res.status(400).json({ error: 'Nombre y email son obligatorios' });
    }

    const query = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?';
    
    db.query(query, [nombre, email, telefono, id], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'El email ya está registrado' });
            }
            console.error('Error al actualizar usuario:', err);
            return res.status(500).json({
                error: 'Error al actualizar usuario',
                details: err.message
            });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado exitosamente' });
    });
});

// DELETE - Eliminar usuario
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            return res.status(500).json({
                error: 'Error al eliminar usuario',
                details: err.message
            });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    });
});
// VERIFICAR LOGIN DE USUARIO
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email y contraseña son requeridos'
        });
    }

    const query = 'SELECT id, nombre, email, telefono FROM usuarios WHERE email = ? AND password = ?';
    
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error en login:', err);
            return res.status(500).json({
                success: false,
                message: 'Error del servidor'
            });
        }

        if (results.length > 0) {
            res.json({
                success: true,
                message: 'Login exitoso',
                user: results[0]
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }
    });
});

module.exports = router;