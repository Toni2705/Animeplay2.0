// VideoPage.js
import React, { useEffect, useState, useRef } from 'react';
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
    const videoRef = useRef(null);
    const { id } = useParams();
    const [suscrito, setSuscrito] = useState(false);

    useEffect(() => {
        
       
        const isLoggedInSession = sessionStorage.getItem('Usuario') !== null;
        
        if (isLoggedInSession) {
          setIsLoggedIn(true);
          try {
            const usuario = JSON.parse(isLoggedInSession);
            setSuscrito(usuario.suscrito); 
          } catch (error) {
            console.error('Error al analizar los datos del usuario:', error);
          }
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

    useEffect(() => {
      const storedTime = sessionStorage.getItem(`videoTime_${id}`);
      console.log(storedTime)
      if (videoRef.current) {
        videoRef.current.addEventListener('loadedmetadata', () => {
            if (storedTime !== null) {
                const time = parseInt(storedTime);
                console.log(time)
                    videoRef.current.currentTime = time;
                    console.warn("El tiempo almacenado no es válido.");
                
            }
        });
    }
        const handleBeforeUnload = () => {
            if (videoRef.current) {
                const currentTime = Math.floor(videoRef.current.currentTime);
                sessionStorage.setItem(`videoTime_${id}`, currentTime);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [id]);

    const handleVideoTimeChange = () => {
        if (videoRef.current) {
            const currentTime = Math.floor(videoRef.current.currentTime);
            sessionStorage.setItem(`videoTime_${id}`, currentTime);
        }
    };

    if (!anime || !isLoggedIn) {
        return <div id='noPass'>No tienes permiso para acceder aqui...</div>;
    }

    return (
        <div>
            <Header />
            <div className="video-container">
                <video
                    ref={videoRef}
                    controls
                    autoPlay
                    onTimeUpdate={handleVideoTimeChange}
                >
                    <source src={`http://localhost:3001/images/${anime.video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
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
