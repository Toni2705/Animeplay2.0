import React from 'react';
import Header from '../components/header';
import '../styles/home.css'; 
import BannerKimetsu from '../img/banner-kimetsu.jpg';
import BannerHaikyuu from '../img/banner-haikyuu.png';
import BannerBlueLock from '../img/banner-blue-lock.jpg';
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
  return (
    <div>
      <Header />
      <div className="slideshow-container">
        <div className="mySlides fade">
          <div className="numbertext">1 / 3</div>
          <img src={BannerBlueLock} style={{ width: '100%' }} alt='Banner Blue Lock' />
          <div className="text"></div>
        </div>
        
        <div className="mySlides fade">
          <div className="numbertext">2 / 3</div>
          <img src={BannerKimetsu} style={{ width: '100%' }} alt="Banner Kimestu No Yaiba" />
          <div className="text"></div>
        </div>
        
        <div className="mySlides fade">
          <div className="numbertext">3 / 3</div>
          <img src={BannerHaikyuu} style={{ width: '100%' }} alt='Banner Haikyuu' />
          <div className="text"></div>
        </div>
        
        <a className="prev">&#10094;</a>
        <a className="next">&#10095;</a>
      </div>
      <div className="populares">
        <h3>¡Animes más populares!</h3>
      </div>
    </div>
  );
}

export default Home;
