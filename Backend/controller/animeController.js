const {Anime} = require('../models/animeModel.js')
const { Op, sequelize } = require('sequelize');

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

  exports.searchAnimesByName = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Falta el parámetro de consulta' });
        }

        // Realizar la búsqueda de animes por nombre utilizando el modelo Anime
        const animes = await Anime.findAll({
          where: {
            titulo: {
                [Op.like]: `%${query}%`
            }
        },
        attributes: ['id', 'titulo']
        });

        return res.status(200).json(animes);
    } catch (error) {
        console.error('Error al buscar animes:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
exports.getSuggestedAnimes = async (req, res) => {
  try {
    const { id } = req.params;
    const suggestedAnimes = await Anime.findAll({
      where: {
        id: { [Op.not]: parseInt(id) } 
      },
      limit: 5 
    });
    res.status(200).json({ suggestedAnimes });
  } catch (error) {
    console.error('Error al obtener animes sugeridos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
