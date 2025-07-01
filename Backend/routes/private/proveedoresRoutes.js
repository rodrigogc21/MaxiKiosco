const express = require('express')
const router = express.Router()
const controlador = require('../../controllers/ProveedorController')
const verificarToken = require('../../Middleware/verificarToken')
const verificarRol = require('../../Middleware/verificarRol')

router.use(verificarToken)
router.use(verificarRol(['admin']))

router.get('/', controlador.listarProveedores)
router.get('/:id_proveedor', controlador.obtenerProveedor)
router.post('/', controlador.crearProveedor)
router.put('/:id_proveedor', controlador.editarProveedor)
router.delete('/:id_proveedor', controlador.eliminarProveedor)

module.exports = router