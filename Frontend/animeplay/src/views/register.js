import React, { useState } from 'react';
import '../styles/register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

const customToastStyle = {
  backgroundColor: '#333',
  color: '#ffffff',
};

// Configuración para las notificaciones de toast
const customToastConfig = {
  style: customToastStyle,
  progressStyle: {
    backgroundColor: '#ff6600',
  },
};


const Registro = ({ history }) => {
  const [usuario, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      console.log(usuario, password, email)
      const response = await fetch('http://localhost:3001/api/register', { // Cambiar la URL según la configuración de tu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, usuario, password})
      });

      if (response.ok) {
        console.log(loggedIn)

        // El inicio de sesión fue exitoso
        const data = await response.json();
        console.log('Respuesta del backend:', data);
        sessionStorage.setItem('Usuario',JSON.stringify(data.user))
        setLoggedIn(true)

      } else {
        // El inicio de sesión falló
        toast.error('Error, usuario ya registrado. Por favor, verifica tus credenciales.', customToastConfig);
        console.error('Error en el registro:', response.statusText);
      }
    } catch (error) {
      toast.error('Error en el registro. Por favor, intenta nuevamente más tarde.', customToastConfig);
      console.error('Error en el registro:', error.message);
    }
  };
  if (loggedIn) {

    return <Navigate to="/" />;
  }
  

  return (
    <><div className="registro-container">
      <ToastContainer />
      <Link to="/" className="link"><img src='http://localhost:3001/images/logo.png' alt='Logo' className='logo'/></Link>
      <h2 className="registro-header">¡Regístrate aquí!</h2>
      <form className="registro-form" onSubmit={handleRegistro}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={usuario}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input" />
        </div>
        <button type="submit" className="registro-button">Registrarse</button>
      </form>
      <h4 className="login-link">¿Ya tienes cuenta de AnimePlay?</h4>
      <h4 className="login-link"><a href="/login">¡Inicia sesión aquí!</a></h4>
    </div><Footer fixed={true} /></>
  );
};

export default Registro;
