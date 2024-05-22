// VideoPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/headerLogueado'; 
import '../styles/video.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';

function VideoPage() {
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
  return (
    <div>
      <Header />
      <div className="video-container">
        <iframe
          title={anime.titulo}
          src={`http://localhost:3001/images/${anime.video}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="anime-details">
        <img src={`http://localhost:3001/images/${anime.cartel}`} alt="Cartel del anime" />
        <div className="anime-info">
          <h2>{anime.titulo}</h2>
          <p>{anime.descripcion}</p>
          <p><strong>Año:</strong> {anime.year_emision}</p>
          
          
        </div>
    </div>
    <Footer />
    </div>
  );
}

export default VideoPage;
