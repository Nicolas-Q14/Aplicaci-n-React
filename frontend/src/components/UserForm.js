import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserForm({ user, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                nombre: user.nombre || '',
                email: user.email || '',
                telefono: user.telefono || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user) {
                // Actualizar usuario existente
                await axios.put(`http://localhost:5001/api/usuarios/${user.id}`, formData);
            } else {
                // Crear nuevo usuario
                await axios.post('http://localhost:5001/api/usuarios', formData);
            }
            onSave();
        } catch (error) {
            alert(error.response?.data?.error || 'Error al guardar usuario');
        }
    };

    return (
        <div style={{ 
            border: '1px solid #ccc', 
            padding: '20px', 
            margin: '20px 0',
            borderRadius: '8px'
        }}>
            <h3>{user ? 'Editar Usuario' : 'Crear Usuario'}</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Nombre: </label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        style={{ marginLeft: '10px', padding: '5px' }}
                    />
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                    <label>Email: </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ marginLeft: '10px', padding: '5px' }}
                    />
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                    <label>Teléfono: </label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        style={{ marginLeft: '10px', padding: '5px' }}
                    />
                </div>
                
                <div>
                    <button type="submit" style={{ 
                        backgroundColor: '#4CAF50', 
                        color: 'white', 
                        padding: '8px 16px', 
                        border: 'none', 
                        borderRadius: '4px',
                        marginRight: '10px'
                    }}>
                        {user ? 'Actualizar' : 'Crear'}
                    </button>
                    
                    <button type="button" onClick={onCancel} style={{ 
                        backgroundColor: '#f44336', 
                        color: 'white', 
                        padding: '8px 16px', 
                        border: 'none', 
                        borderRadius: '4px'
                    }}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserForm;