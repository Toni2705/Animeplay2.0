const express = require('express')
const userController = require('../controller/userController')
const animeController = require("../controller/animeController")
const router = express.Router()

router.post('/login', userController.login)
router.post('/register', userController.registro)
router.get('/animes', animeController.getAllAnimes)
router.get('/animes/:id', animeController.getAnimeById);

module.exports = router;