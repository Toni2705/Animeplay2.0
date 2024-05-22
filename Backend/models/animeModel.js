const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const Anime = sequelize.define('Anime', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cartel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  video: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year_emision: {
    type: DataTypes.INTEGER,
    allowNull: false
  },destacado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
}, {
  timestamps: false // Esto desactivará las columnas createdAt y updatedAt
});
// Sincronizar el modelo con la base de datos
Anime.sync();

module.exports = Anime;


