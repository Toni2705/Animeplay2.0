// AnimeList.js
import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import HeaderLogueado from '../components/headerLogueado';
import '../styles/animes.css'; 
import { Link } from 'react-router-dom';
import Footer from '../components/footer';

const fetchAnimes = async () => {
  const response = await fetch('http://localhost:3001/api/animes');
  const data = await response.json();
  return data.animes;
};

function AnimeList() {
  const [animes, setAnimes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedInSession = sessionStorage.getItem('Usuario') !== null;
    if (isLoggedInSession) {
      setIsLoggedIn(isLoggedInSession);
    }
    const getAnimes = async () => {
      const allAnimes = await fetchAnimes();
      setAnimes(allAnimes);
    };

    getAnimes();
  }, []);

  return (
    <div className='animelist'>
        {isLoggedIn ? <HeaderLogueado /> : <Header />}
        <h3>¡Todos los animes!</h3>
        <div className="anime-container">
        {animes.map(anime => (
            <div key={anime.id} className="anime-card">
             <Link className='link' to={`/animes/${anime.id}`}>
              <img src={`http://localhost:3001/images/${anime.cartel}`} alt="Cartel" />
              <div className="titulo">{anime.titulo}</div>
              </Link>
            </div>
        ))}
        </div>
        <Footer />
    </div>
  );
}

export default AnimeList;
