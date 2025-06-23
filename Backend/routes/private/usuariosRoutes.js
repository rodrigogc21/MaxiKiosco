const express = Require('express')
const router = express.Router()
const controlador = Require('../controllers/usuarioController')
const verificarToken = Require('../middleware/verificarToken')
const verificarRol = Require('../middleware/verificarRol')


router.use(verificarToken)
router.use(verificarRol(['admin']))

router.get('/', controlador.listarUsuarios)
router.get('/:id', controlador.obtenerUsuario)
router.post('/crear', controlador.crearUsuarioDesdeAdmin)
router.put('/:id', controlador.editarUsuario)
router.delete('/:id', controlador.eliminarUsuario)