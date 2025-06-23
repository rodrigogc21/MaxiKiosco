const express = require('express')
const router = express.Router()
const controlador = require('../../controllers/productoController')
const verificarToken = require('../../Middleware/verificarToken')
const verificarRol = require('../../Middleware/verificarRol')



router.use(verificarToken)
router.use(verificarRol(['admin', 'empleado']))

router.post('/', controlador.crearProducto)
router.put('/:id', controlador.editarProducto)
router.delete('/:id', controlador.eliminarProducto)

module.exports = router
