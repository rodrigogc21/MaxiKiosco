const express = require('express');
const router = express.Router();
const controlador = require('../../controllers/categoriaController');
const verificarToken = require('../../Middleware/verificarToken')
const verificarRol = require('../../Middleware/verificarRol')

router.use(verificarToken)
router.use(verificarRol(['admin']))

router.post('/crear', controlador.crearCategoria);
router.put('/:id', controlador.editarCategoria);
router.delete('/:id', controlador.eliminarCategoria);

module.exports = router;
