# Aplicaci-n-React
Aplicación React con MySQL - Lista de Usuarios
# 📦 Proyecto Usuarios

Aplicación web **Full Stack** para la **gestión de usuarios**, desarrollada como proyecto universitario.  
Incluye un **frontend en React** y un **backend en Node.js + Express + MySQL**.

---

## 🧠 Descripción general

La aplicación permite realizar operaciones **CRUD** (crear, leer, actualizar y eliminar) sobre usuarios.

Está dividida en dos partes principales:

- **Frontend:** desarrollado con React, responsable de la interfaz de usuario.  
- **Backend:** construido con Node.js y Express, encargado de la lógica del servidor y conexión con MySQL.

---

## 🏗️ Estructura del proyecto

```
proyecto-usuarios/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── routes/
│       ├── controllers/
│       └── models/
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.js
    ├── package.json
    └── public/
```

---

## ⚙️ Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v16 o superior  
- [MySQL](https://www.mysql.com/)  
- [Git](https://git-scm.com/) (opcional, para clonar el repositorio)

---

## 🚀 Instalación y ejecución

### 🔹 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/proyecto-usuarios.git
cd proyecto-usuarios
```

---

### 🔹 2. Configurar el backend

1. Ir al directorio del backend:
   ```bash
   cd backend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear un archivo `.env` con tus credenciales de MySQL:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_contraseña
   DB_NAME=usuarios_db
   PORT=5001
   ```

4. Iniciar el servidor:
   ```bash
   npm run dev
   ```

   El backend se ejecutará en:  
   👉 [http://localhost:5001](http://localhost:5001)

---

### 🔹 3. Configurar el frontend

1. Ir al directorio del frontend:
   ```bash
   cd ../frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar el servidor de desarrollo:
   ```bash
   npm start
   ```

   El frontend se ejecutará en:  
   👉 [http://localhost:3000](http://localhost:3000)

---

## 🧩 Tecnologías utilizadas

### **Frontend**
- React  
- React Router  
- Axios  
- Bootstrap / TailwindCSS (dependiendo de lo que uses)

### **Backend**
- Node.js  
- Express  
- MySQL  
- Nodemon (modo desarrollo)  
- dotenv (manejo de variables de entorno)

---

## 🧠 Funcionalidades

- ✅ Crear usuario  
- ✅ Listar usuarios  
- ✅ Editar usuario  
- ✅ Eliminar usuario  
- 🔒 Conexión segura a base de datos  
- 🔄 Comunicación cliente-servidor vía API REST

---

## 🧪 Scripts útiles

### Backend
| Comando | Descripción |
|----------|-------------|
| `npm run dev` | Ejecuta el servidor con nodemon |
| `npm start` | Ejecuta el servidor sin nodemon |

### Frontend
| Comando | Descripción |
|----------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Crea el build de producción |


