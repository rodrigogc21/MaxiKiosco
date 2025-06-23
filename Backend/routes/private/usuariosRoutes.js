const express = require('express')
const router = express.Router()
const controlador = require('../../controllers/usuarioController')
const verificarToken = require('../../Middleware/verificarToken')
const verificarRol = require('../../Middleware/verificarRol')


router.use(verificarToken)
router.use(verificarRol(['admin']))

router.get('/', controlador.listarUsuarios)
router.get('/:id', controlador.obtenerUsuario)
router.post('/crear', controlador.crearUsuarioDesdeAdmin)
router.put('/:id', controlador.editarUsuario)
router.delete('/:id', controlador.eliminarUsuario)

module.exports = router
