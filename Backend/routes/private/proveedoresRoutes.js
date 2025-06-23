const express = require('express')
const router = express.Router()
const controlador = require('../../controllers/ProveedorController')
const verificarToken = require('../../Middleware/verificarToken')
const verificarRol = require('../../Middleware/verificarRol')

router.use(verificarToken)
router.use(verificarRol(['admin']))

router.get('/', controlador.listarProveedores)
router.get('/:id', controlador.obtenerProveedor)
router.post('/', controlador.crearProveedor)
router.put('/:id', controlador.editarProveedor)
router.delete('/:id', controlador.eliminarProveedor)

module.exports = router