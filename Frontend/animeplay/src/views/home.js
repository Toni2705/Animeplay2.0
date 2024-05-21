import Header from '../components/header';
import HeaderLogueado from '../components/headerLogueado';
import '../styles/home.css'; 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
let index = 0,
  sliders,
  timer;

document.addEventListener('DOMContentLoaded', function() {
  sliders = document.querySelectorAll(".mySlides");
  for(let i = 0; i < sliders.length; i++) {
    sliders[i].style.display = "none";  
  }

  document.querySelector('.prev').addEventListener('click', () => showSlides(-1));
  document.querySelector('.next').addEventListener('click', () => showSlides(1));

  document.addEventListener('keyup', (e) => {
    if(e.keyCode == 37) {
      showSlides(-1);
    } else if(e.keyCode == 39) {
      showSlides(1);
    }
  });

  showSlides(0);
});

function showSlides(n) {
  clearTimeout(timer);
  sliders[index].style.display = 'none';
  index += n;
  if (index >= sliders.length) {
    index = 0;
  } else if(index < 0) {
    index = sliders.length - 1;
  }
  sliders[index].style.display = "block";  
  timer = setTimeout(showSlides, 4000, 1);
}

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animes, setAnimes] = useState([])
  useEffect(() => {
    const isLoggedInSession = sessionStorage.getItem('Usuario') !== null;
    if (isLoggedInSession) {
      setIsLoggedIn(isLoggedInSession);
    }

    fetch('http://localhost:3001/api/animes') // Realizar una solicitud GET para obtener los datos de los animes
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error al obtener los datos de los animes');
      })
      .then(data => {
        setAnimes(data.animes); // Almacenar los datos de los animes en el estado
      })
      .catch(error => {
        console.error('Error de solicitud:', error);
      });
  }, []);
  return (
    <div>
      {isLoggedIn ? <HeaderLogueado /> : <Header />}
      <div className="slideshow-container">
        <div className="mySlides fade">
          <div className="numbertext">1 / 4</div>
          <img src="http://localhost:3001/images/banner1.jpg" style={{ width: '100%' }} alt='Banner Blue Lock' />
          <div className="text"></div>
        </div>
        
        <div className="mySlides fade">
          <div className="numbertext">2 / 4</div>
          <img src="http://localhost:3001/images/banner2.jpg" style={{ width: '100%' }} alt="Banner Kimestu No Yaiba" />
          <div className="text"></div>
        </div>
        
        <div className="mySlides fade">
          <div className="numbertext">3 / 4</div>
          <img src="http://localhost:3001/images/banner3.jpg" style={{ width: '100%' }} alt='Banner Haikyuu' />
          <div className="text"></div>
        </div>
        <div className="mySlides fade">
          <div className="numbertext">4 / 4</div>
          <img src="http://localhost:3001/images/banner4.png" style={{ width: '100%' }} alt='Banner Haikyuu' />
          <div className="text"></div>
        </div>
        
        <a className="prev">&#10094;</a>
        <a className="next">&#10095;</a>
      </div>
      <div className="populares">
        <h3>¡Animes más populares!</h3>
        <div className="anime-container">
        {animes.filter(anime => anime.destacado).map(anime => (
            <div key={anime.id} className="anime-card">
               <Link className='link' to={`/animes/${anime.id}`}>
              <img src={`http://localhost:3001/images/${anime.cartel}`} alt="Cartel" />
              <div className="titulo">{anime.titulo}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
