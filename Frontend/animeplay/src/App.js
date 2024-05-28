import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './views/home';
import Login from './views/login';
import Registro from './views/register';
import Anime from "./views/animes";
import AnimeDetail from "./views/infoAnime";
import VideoAnime from "./views/video";
import Admin from "./views/admin";
const hostname = window.location.hostname;

  
const App = () => {
  const [redirected, setRedirected] = useState(false);
  const fullURL = window.location.href;
  console.log(fullURL)
  useEffect(() => {
    if ( hostname === "admin.animeplay.play" && !redirected && fullURL !== "http://admin.animeplay.play:3000/admin") {
      console.log(hostname);
      setRedirected(true);
      console.log(redirected)
      window.location.href = "/admin";
    }
  }, [redirected]);
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/animes" element={<Anime />} />
          <Route path="/animes/:id" element={<AnimeDetail />} />
          <Route path="/video/:id" element={<VideoAnime />} />
          <Route path="/admin" element={<Admin />} />
          {/* Más rutas aquí si es necesario */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
