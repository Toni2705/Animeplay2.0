// src/pages/AnimeDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import HeaderLogueado from '../components/headerLogueado';
import '../styles/infoAnime.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import '../styles/reactalert.css';
import Footer from '../components/footer';


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

function AnimeDetail() {
    
    const [anime, setAnime] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [suscrito, setSuscrito] = useState(false);
    const { id } = useParams();
    const [suggestedAnimes, setSuggestedAnimes] = useState([]);
    console.log({id})

  useEffect(() => {
    const usuarioString = sessionStorage.getItem('Usuario');
    if (usuarioString) {
      setIsLoggedIn(true);
      try {
        const usuario = JSON.parse(usuarioString);
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
    const fetchSuggestedAnimes = async () => {
      try {

        const response = await fetch(`http://localhost:3001/api/sugeridos/${id}`);
        const data = await response.json();
        setSuggestedAnimes(data.suggestedAnimes);
      } catch (error) {
        console.error('Error al obtener los animes sugeridos:', error);
      }
    };
  
    fetchSuggestedAnimes();
  }
  , [id]);

    
  

  
  if (!anime) {
    return <div>Cargando...</div>;
  }
  
  const handleSuscribe = async () => {
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
              setIsLoggedIn(true);
              setSuscrito(true)
            }
        } catch (error) {
            console.error('Error al suscribirse:', error);
        }
    } else{
      toast.error('Inicie sesión primero o registrese', customToastConfig);
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
        onClick: handleSuscribe, 
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

  return (
    <div>
      <ToastContainer />
         {isLoggedIn ? <HeaderLogueado /> : <Header />}
    
        <div className="anime-detail-container">  
            <img className="anime-detail-image" src={`http://localhost:3001/images/${anime.cartel}`} alt="Cartel" />
            <div className="anime-detail-info">
                <h1 className="anime-detail-title">{anime.titulo}</h1>
                <p className="anime-detail-description"><strong>Descripción:</strong></p>
                <p className="anime-detail-description">{anime.descripcion}</p>
                <p className="anime-detail-year"><strong>Año de emisión:</strong></p>
                <p>{anime.year_emision}</p>
                {console.log(suscrito)}
                { suscrito ? (
                  <Link className='link' to={`/video/${anime.id}`}>
                    <button className="anime-detail-button">VER</button>
                  </Link>
                  ) : (
                    <button className="anime-detail-button1" onClick={confirmSubscription}>Suscribete para poder ver el contenido</button>
                  )}
            </div>
        </div>
        <div className="populares1">
        <h3>¡Recomendaciones!</h3>
        <div className="anime-container1">
        {suggestedAnimes.map((anime) => (
            <div key={anime.id} className="anime-card1">
              <Link className='link' to={`/animes/${anime.id}`}>
                <img src={`http://localhost:3001/images/${anime.cartel}`} alt="Cartel" />
                <div className="titulo">{anime.titulo}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
        <Footer/>
    </div>
    
  );
}

export default AnimeDetail;
