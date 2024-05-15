import React, { useState } from 'react';
import Registro from './register';
import { Navigate } from 'react-router-dom';
import '../styles/login.css'; 

const Login = () => {
  const [usuario, setUsername] = useState('');
  const [contraseña, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(usuario, contraseña)
      const response = await fetch('http://localhost:3001/api/login', { // Cambiar la URL según la configuración de tu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, contraseña })
      });

      if (response.ok) {
        setLoggedIn(true);

        // El inicio de sesión fue exitoso
        const data = await response.json();
        console.log('Respuesta del backend:', data);
        sessionStorage.setItem('Usuario',JSON.stringify(data.user))
      } else {
        // El inicio de sesión falló
        console.error('Error en inicio de sesión:', response.statusText);
      }
    } catch (error) {
      console.error('Error en inicio de sesión:', error.message);
    }
  };
  if (loggedIn) {

    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <h2 className="login-header">¡Iniciar sesión!</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={usuario}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={contraseña}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">Iniciar sesión</button>
      </form>
      <h4 className="register-link">¿No tienes cuenta de AnimePlay?</h4>
      <h4 className="login-link"><a href="/registro">¡Registrate aquí!</a></h4>
    </div>
  );
};

export default Login;
