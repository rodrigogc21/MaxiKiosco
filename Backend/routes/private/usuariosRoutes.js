const express = require('express');
const router = express.Router();
const controladorUsuario = require('../../controllers/usuarioController');
const verificarToken = require('../../Middleware/verificarToken');
const verificarRol = require('../../Middleware/verificarRol');

// Aplicar middleware para proteger todas las rutas de este router
router.use(verificarToken);
router.use(verificarRol(['admin']));

// Listar todos los usuarios
router.get('/', controladorUsuario.listarUsuarios);

// Obtener usuario por ID
router.get('/:id', controladorUsuario.obtenerUsuario);

// Crear usuario (solo admin)
router.post('/crear', controladorUsuario.crearUsuarioDesdeAdmin);

// Editar usuario por ID (solo admin)
router.put('/:id', controladorUsuario.editarUsuario);

// Eliminar usuario por ID (solo admin)
router.delete('/:id', controladorUsuario.eliminarUsuario);

module.exports = router;
