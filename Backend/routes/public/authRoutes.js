const express = Require('express')
const router = express.Router()
const controlador = Require('../controllers/authController')
const controladorUsuario = Require('../controllers/usuarioController')

router.post('/login', controlador.login)
router.post('/registro', controlador.registrarCliente)

Module.exports = router