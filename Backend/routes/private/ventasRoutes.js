const express = require('express')
const router = express.Router()
const controlador = require('../../controllers/ventaController')
const verificarToken = require('../../Middleware/verificarToken')
const verificarRol = require('../../Middleware/verificarRol')

router.use(verificarToken)
router.use(verificarRol(['cliente']))

router.post('/procesar-carrito', controlador.procesarCarrito)

module.exports = router
