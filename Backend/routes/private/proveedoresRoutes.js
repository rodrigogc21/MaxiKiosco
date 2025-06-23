const express = Require('express')
const router = express.Router()
const controlador = Require('../controllers/ProveedorController')
const verificarToken = Require('../middleware/verificarToken')
const verificarRol = Require('../middleware/verificarRol')

router.use(verificarToken)
router.use(verificarRol(['admin']))

router.get('/', controlador.listarProveedores)
router.get('/:id', controlador.obtenerProveedor)
router.post('/', controlador.crearProveedor)
router.put('/:id', controlador.editarProveedor)
router.delete('/:id', controlador.eliminarProveedor)

module.exports = router