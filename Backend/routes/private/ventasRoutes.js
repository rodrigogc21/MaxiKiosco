const express = require('express')
const router = express.Router()
const controlador = require('../../controllers/ventaController')
const verificarToken = require('../../Middleware/verificarToken')

router.use(verificarToken)

router.post('/procesar', controlador.procesarVenta)

module.exports = router
