const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  suscrito: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: false // Esto desactivará las columnas createdAt y updatedAt
});
// Sincronizar el modelo con la base de datos
User.sync();

module.exports = User;
