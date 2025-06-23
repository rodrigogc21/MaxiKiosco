const express = Require('express')
const router = express.Router()
const controlador = Require('../controllers/ordenCompraController')
const verificarToken = Require('../middleware/verificarToken')
const verificarRol = Require('../middleware/verificarRol')

router.use(verificarToken)
router.use(verificarRol(['admin', 'empleado']))

router.post('/', controlador.crearOrden)
router.get('/', controlador.listarOrdenes)
router.get('/:id', controlador.obtenerOrdenPorId)
router.delete('/:id', controlador.borrarOrden)

module.exports = router
