import React, { useState } from 'react';
import '../styles/header.css';
import logo from '../img/logo.png'; 
import { Link } from 'react-router-dom';
function Header() {
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
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="#" className="nav-link">Inicio</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Anime</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Manga</a></li>
          </ul>
        </nav>
        <div className={`search ${expanded ? 'expanded' : ''}`}>
          <input type="text" placeholder="Buscar..." className="search-input" />
          <button className="search-button" onClick={handleSearchButtonClick}>
            Buscar
          </button>
        </div>
        <button className="login"><Link to="/login"className='link' >Login</Link></button>
      </div>
    </header>
  );
}

export default Header;
