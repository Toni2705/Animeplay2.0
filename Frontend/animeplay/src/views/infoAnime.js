// src/pages/AnimeDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import HeaderLogueado from '../components/headerLogueado';
import '../styles/infoAnime.css'; 

function AnimeDetail() {
    
    const [anime, setAnime] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { id } = useParams();
    console.log({id})

  useEffect(() => {
    const isLoggedInSession = sessionStorage.getItem('Usuario') !== null;
    if (isLoggedInSession) {
      setIsLoggedIn(isLoggedInSession);
    }
    const fetchAnime = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/animes/${id}`);
        const data = await response.json();
        setAnime(data.anime);
      } catch (error) {
        console.error('Error al obtener el anime:', error);
      }
    };

    fetchAnime();
  }, [id]);

  if (!anime) {
    return <div>Cargando...</div>;
  }
  const usuarioString = sessionStorage.getItem('Usuario');
  const usuario = JSON.parse(usuarioString);
    const suscrito = usuario.suscrito;

  return (
    <div>
         {isLoggedIn ? <HeaderLogueado /> : <Header />}
    
    <div className="anime-detail-container">
           
            <img className="anime-detail-image" src={`http://localhost:3001/images/${anime.cartel}`} alt="Cartel" />
            <div className="anime-detail-info">
                <h1 className="anime-detail-title">{anime.titulo}</h1>
                <p className="anime-detail-description">{anime.descripcion}</p>
                <p className="anime-detail-year">Año de emisión: {anime.year_emision}</p>
                {suscrito && (
                    <button className="anime-detail-button">VER</button>
                )}
            </div>
        </div>
    </div>
  );
}

export default AnimeDetail;
