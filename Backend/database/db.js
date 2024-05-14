const Sequelize = require('sequelize')

const db = new Sequelize ('animeplay', 'root','',{
    host:'localhost',
    dialect:"mysql"
})

module.exports = db;
