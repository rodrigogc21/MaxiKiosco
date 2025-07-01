const express = require('express')
const router = express.Router()
const controlador = require('../../controllers/ventaController')
// const verificarToken = require('../../Middleware/verificarToken')
// const verificarRol = require('../../Middleware/verificarRol')

// router.use(verificarToken)
// router.use(verificarRol(['admin', 'empleado']))

router.post('/procesar', controlador.procesarVenta)

module.exports = router
