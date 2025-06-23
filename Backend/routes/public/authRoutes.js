const express = require('express')
const router = express.Router()
const controlador = require('../../controllers/authController')
const controladorUsuario = require('../../controllers/usuarioController')

router.post('/login', controlador.login)
router.post('/registro', controladorUsuario.registrarCliente)

module.exports = router
