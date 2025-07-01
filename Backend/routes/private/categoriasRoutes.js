const express = require('express');
const router = express.Router();
const controlador = require('../../controllers/categoriaController');
const verificarToken = require('../../Middleware/verificarToken')
const verificarRol = require('../../Middleware/verificarRol')

router.use(verificarToken)
router.use(verificarRol(['admin']))

router.post('/', controlador.crearCategoria);
router.put('/:id_categoria', controlador.editarCategoria);
router.delete('/:id_categoria', controlador.eliminarCategoria);

module.exports = router;
