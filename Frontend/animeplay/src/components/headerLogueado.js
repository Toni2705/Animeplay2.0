import React, { useState } from 'react';
import '../styles/header.css';
import { Link } from 'react-router-dom';
function HeaderLogueado() {
  const [expanded, setExpanded] = useState(false); 

  // Función para manejar el clic en el botón de búsqueda
  const handleSearchButtonClick = () => {
    setExpanded(!expanded);
  };

  // Función para manejar clics fuera del campo de búsqueda
  const handleOutsideClick = (event) => {
    if (!event.target.closest('.search')) {
      setExpanded(false); 
    }
  };

  // Agregar un event listener para manejar clics fuera del campo de búsqueda
  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
        <img src="http://localhost:3001/images/logo.png" alt="Logo" className="logo-image" />
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/"className='link' >Inicio</Link></li>
            <li className="nav-item"><Link to="/animes"className='link' >Animes</Link></li>
          </ul>
        </nav>
        <div className={`search ${expanded ? 'expanded' : ''}`}>
          <input type="text" placeholder="Buscar..." className="search-input" />
          <button className="search-button" onClick={handleSearchButtonClick}>
            Buscar
          </button>
        </div>
        <Link to="/perfil"className='link' ><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.34" d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></Link>
      </div>
    </header>
  );
}

export default HeaderLogueado;
