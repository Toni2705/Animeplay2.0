const Anime = require('../models/animeModel.js')


exports.getAllAnimes = async (req, res) => {
  try {
    // Obtener todos los registros del modelo Anime
    const animes = await Anime.findAll();
    
    // Devolver los datos al frontend
    return res.status(200).json({ message: 'Datos de animes obtenidos exitosamente', animes });
  } catch (error) {
    console.error('Error al obtener los datos de animes:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.getAnimeById = async (req, res) => {
    try {
      const { id } = req.params;
      const anime = await Anime.findByPk(id);
      if (!anime) {
        return res.status(404).json({ message: 'Anime no encontrado' });
      }
      return res.status(200).json({ anime });
    } catch (error) {
      console.error('Error al obtener el anime:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
