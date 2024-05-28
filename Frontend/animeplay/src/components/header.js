import React, { useState } from 'react';
import '../styles/header.css';
import { Link } from 'react-router-dom';
function Header() {
  const [expanded, setExpanded] = useState(false); 
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
  const handleSearchInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  
    if (query) {
      try {
        const response = await fetch(`httpss://localhost:3001/api/buscar?query=${query}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error al buscar animes:', error);
      }
    } else {
      setSearchResults([]);
    }
  }

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
        <Link to="/" className='link'><img src="httpss://localhost:3001/images/logo.png" alt="Logo" className="logo-image" /></Link>
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
        <button className="login"><Link to="/login"className='link' >Login</Link></button>
      </div>
    </header>
  );
}

export default Header;
