import React, { useState } from 'react';
import '../styles/register.css';

const Registro = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        // El registro fue exitoso, redirigir al usuario a la página de inicio de sesión
        history.push('/login');
      } else {
        // El registro falló, manejar el error aquí
        console.error('Error en registro:', response.statusText);
      }
    } catch (error) {
      console.error('Error en registro:', error.message);
    }
  };

  return (
    <div className="registro-container">
      <h2 className="registro-header">¡Registrate aquí!</h2>
      <form className="registro-form" onSubmit={handleRegistro}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="registro-button">Registrarse</button>
      </form>
      <h4 className="login-link">¿Ya tienes cuenta de AnimePlay?</h4>
      <h4 className="login-link"><a href="/login">¡Inicia sesión aquí!</a></h4>
    </div>
  );
};

export default Registro;
