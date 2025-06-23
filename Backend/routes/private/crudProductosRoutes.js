const express = Require('express')
const router = express.Router()
const controlador = Require('../controllers/productoController')
const verificarRol = Require('../middleware/verificarRol')
const verificarToken = Require('../middleware/verificarToken')


router.use(verificarToken)
router.use(verificarRol['admin', 'empleado'])

router.post('/', controlador.crearProducto)
router.put('/:id', controlador.editarProducto)
router.delete('/:id', controlador.eliminarProducto)

module.exports = router