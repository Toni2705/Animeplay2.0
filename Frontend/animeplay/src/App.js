import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/home';
import Login from './views/login';
import Registro from './views/register';
import Anime from "./views/animes";
import AnimeDetail from "./views/infoAnime";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/animes" element={<Anime />} />
          <Route path="/animes/:id" element={<AnimeDetail/>} />
          {/* Más rutas aquí si es necesario */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
