const express = require('express')
const router = express.Router()
const controlador = require('../../controllers/ordenCompraController')
const verificarToken = require('../../Middleware/verificarToken')
const verificarRol = require('../../Middleware/verificarRol')

router.use(verificarToken)
router.use(verificarRol(['admin', 'empleado']))

router.post('/', controlador.crearOrden)
router.get('/', controlador.listarOrdenes)
router.get('/:id', controlador.obtenerOrdenPorId)
router.delete('/:id', controlador.borrarOrden)

module.exports = router
