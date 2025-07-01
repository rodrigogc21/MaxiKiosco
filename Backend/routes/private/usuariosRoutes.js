const express = require('express');
const router = express.Router();
const controladorUsuario = require('../../controllers/usuarioController');
const verificarToken = require('../../Middleware/verificarToken');
const verificarRol = require('../../Middleware/verificarRol');

router.use(verificarToken);
router.use(verificarRol(['admin', 'empleado']));

router.get('/', controladorUsuario.listarUsuarios);
router.get('/:id', controladorUsuario.obtenerUsuario);
router.post('/crear', controladorUsuario.crearUsuarioDesdeAdmin);
router.put('/:id', controladorUsuario.editarUsuario);
router.delete('/:id', controladorUsuario.eliminarUsuario);

module.exports = router
