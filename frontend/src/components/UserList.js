import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

function UserList() {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/usuarios');
            setUsers(response.data);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            alert('Error al cargar los usuarios');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreate = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleView = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5001/api/usuarios/${id}`);
            setSelectedUser(response.data);
        } catch (error) {
            alert('Error al cargar el usuario');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                await axios.delete(`http://localhost:5001/api/usuarios/${id}`);
                fetchUsers(); // Recargar la lista
                alert('Usuario eliminado exitosamente');
            } catch (error) {
                alert(error.response?.data?.error || 'Error al eliminar usuario');
            }
        }
    };

    const handleSave = () => {
        setShowForm(false);
        setEditingUser(null);
        fetchUsers(); // Recargar la lista
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingUser(null);
    };

    const closeUserDetail = () => {
        setSelectedUser(null);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Gestión de Usuarios</h2>
            
            {/* Botón para crear nuevo usuario */}
            <button onClick={handleCreate} style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                marginBottom: '20px',
                cursor: 'pointer'
            }}>
                + Crear Nuevo Usuario
            </button>

            {/* Formulario (solo se muestra cuando showForm es true) */}
            {showForm && (
                <UserForm 
                    user={editingUser}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}

            {/* Modal para ver detalles del usuario */}
            {selectedUser && (
                <div style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        minWidth: '300px'
                    }}>
                        <h3>Detalles del Usuario</h3>
                        <p><strong>ID:</strong> {selectedUser.id}</p>
                        <p><strong>Nombre:</strong> {selectedUser.nombre}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Teléfono:</strong> {selectedUser.telefono || 'No especificado'}</p>
                        <p><strong>Fecha de Registro:</strong> {new Date(selectedUser.fecha_registro).toLocaleDateString()}</p>
                        <button onClick={closeUserDetail} style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '4px',
                            marginTop: '10px'
                        }}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Tabla de usuarios */}
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nombre}</td>
                            <td>{user.email}</td>
                            <td>{user.telefono || 'No especificado'}</td>
                            <td>
                                <button onClick={() => handleView(user.id)} style={{
                                    backgroundColor: '#17a2b8',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '3px',
                                    marginRight: '5px',
                                    cursor: 'pointer'
                                }}>
                                    Ver
                                </button>
                                
                                <button onClick={() => handleEdit(user)} style={{
                                    backgroundColor: '#ffc107',
                                    color: 'black',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '3px',
                                    marginRight: '5px',
                                    cursor: 'pointer'
                                }}>
                                    Editar
                                </button>
                                
                                <button onClick={() => handleDelete(user.id)} style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '3px',
                                    cursor: 'pointer'
                                }}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {users.length === 0 && (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    No hay usuarios registrados. ¡Crea el primero!
                </p>
            )}
        </div>
    );
}

export default UserList;