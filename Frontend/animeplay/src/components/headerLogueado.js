import React, { useState } from 'react';
import '../styles/header.css';
import { Link, Navigate, useLocation  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; 
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


function HeaderLogueado() {
  const [expanded, setExpanded] = useState(false); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [suscrito, setSuscrito] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSuscribirse = async () => {
    const usuarioString = sessionStorage.getItem('Usuario');
    if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        try {
            const response = await fetch('http://localhost:3001/api/suscribirse', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: usuario.id })
            });
            const data = await response.json();
            if (data.success) {
              usuario.suscrito = true;
              const usuarioActualizadoString = JSON.stringify(usuario);
              sessionStorage.setItem('Usuario', usuarioActualizadoString);
              toast.info('Suscripción completa. ¡Disfruta ahora de tus ventajas! ^^', customToastConfig);
              setIsLoggedIn(true);
              setSuscrito(true)
            }
        } catch (error) {
            console.error('Error al suscribirse:', error);
        }
    } else{
      toast.error('Inicie sesión primero o registrese', customToastConfig);
    }
    if(suscrito){
      <Navigate to="/" />
    }
    
};

const handleUnSuscribirse = async () => {
  const usuarioString = sessionStorage.getItem('Usuario');
  if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      try {
          const response = await fetch('http://localhost:3001/api/unsuscribirse', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id: usuario.id })
          });
          const data = await response.json();
          if (data.success) {
            usuario.suscrito = false;
            const usuarioActualizadoString = JSON.stringify(usuario);
            sessionStorage.setItem('Usuario', usuarioActualizadoString);
            toast.info('Suscripción cancelada. ¡Te echaremos de menos! :c', customToastConfig);
            setIsLoggedIn(true);
            setSuscrito(false)
              
          }
      } catch (error) {
          console.error('Error al suscribirse:', error);
      }
  } else{
    toast.error('Inicie sesión primero o registrese', customToastConfig);
  }
  if(!suscrito){
    <Navigate to="/" />
  }
  
};

const confirmSubscription = () => {
  const usuarioString = sessionStorage.getItem('Usuario');
    if (usuarioString) {
  confirmAlert({
    title: 'Confirmar Suscripción',
    message: '¿Deseas suscribirte por 9.99 euros?',
    buttons: [
      {
        label: 'Sí',
        onClick: handleSuscribirse
      },
      {
        label: 'No',
        onClick: () => toast.info('Suscripción cancelada', customToastConfig),
      }
    ]
  });
} else{
  toast.error('Inicie sesión primero o registrese', customToastConfig);
}
};

const confirmUnSubscription = () => {
  const usuarioString = sessionStorage.getItem('Usuario');
    if (usuarioString) {
  confirmAlert({
    title: 'Confirmar cancelacion de suscripcion',
    message: '¿Deseas desuscribirse?',
    buttons: [
      {
        label: 'Sí',
        onClick: handleUnSuscribirse
      },
      {
        label: 'No',
        onClick: () => toast.info('Suscripción cancelada', customToastConfig),
      }
    ]
  });
} else{
  toast.error('Inicie sesión primero o registrese', customToastConfig);
}
};

const confirmLogOut = () => {
  const usuarioString = sessionStorage.getItem('Usuario');
    if (usuarioString) {
  confirmAlert({
    title: 'Cerrar sesión',
    message: '¿Deseas cerrar sesión?',
    buttons: [
      {
        label: 'Sí',
        onClick: handleLogout
      },
      {
        label: 'No',
        onClick: () => toast.info('Suscripción cancelada', customToastConfig),
      }
    ]
  });
} else{
  toast.error('Inicie sesión primero o registrese', customToastConfig);
}
};

const handleSearchButtonClick = async () => {
  setExpanded(!expanded);
  if (searchQuery) {
    try {
      const response = await fetch(`http://localhost:3001/api/animes/buscar?query=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error al buscar animes:', error);
    }
  } else {
    setSearchResults([]);
  }
};

const handleSearchInputChange = async (event) => {
  const query = event.target.value;
  setSearchQuery(query);

  if (query) {
    try {
      const response = await fetch(`http://localhost:3001/api/buscar?query=${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error al buscar animes:', error);
    }
  } else {
    setSearchResults([]);
  }
}

  const handleLogout = () => {
    sessionStorage.clear();
    
    return window.location.href = "/"
  };

  // Función para manejar clics fuera del campo de búsqueda
  const handleOutsideClick = (event) => {
    if (!event.target.closest('.search')) {
      setExpanded(false); 
    }
  };
  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  React.useEffect(() => {
    const usuarioString = sessionStorage.getItem('Usuario');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      setUsuario(usuario);
      setSuscrito(usuario.suscrito);
    }
  }, []);
  // Agregar un event listener para manejar clics fuera del campo de búsqueda
  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <header className="header">
      <ToastContainer />
      <div className="header-container">
        <div className="logo">
        <Link to="/" className='link'><img src="http://localhost:3001/images/logo.png" alt="Logo" className="logo-image" /></Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/"className='link' >Inicio</Link></li>
            <li className="nav-item"><Link to="/animes"className='link' >Animes</Link></li>
          </ul>
        </nav>
        <div className={`search ${expanded ? 'expanded' : ''}`}>
        <input
            type="text"
            placeholder="Buscar..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          {searchResults.length > 0 && (
            <div className="dropdown">
              <ul className="dropdown-list">
                {searchResults.map((result) => (
                  <li className='dropdown-item' key={result.id}>
                    <Link  to={`/animes/${result.id}`} className="search-result-item">{result.titulo}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="profile" onClick={handleProfileClick}>
        <p>{usuario ? usuario.usuario : ''}</p>
          <img src="http://localhost:3001/images/logos/one-piece.jpg" className='fotoPerfil' alt="Foto de perfil" />
          {showDropdown && (
            <div className="dropdown">
              <ul className="dropdown-list">
              <li className="dropdown-item" >
                <Link  to="/" className='link' onClick={confirmLogOut}>Cerrar Sesión</Link>
                </li>
                <li className="dropdown-item">
                  {suscrito ? (
                    <Link onClick={confirmUnSubscription} className='link'><img src='http://localhost:3001/images/premium.png'alt='Premium' id='premium'/>Cancelar Suscripción</Link>
                  ) : (
                    <Link onClick={confirmSubscription} className='link'><img src='http://localhost:3001/images/premium.png'alt='Premium' id='premium'/>Suscribirse</Link>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default HeaderLogueado;
