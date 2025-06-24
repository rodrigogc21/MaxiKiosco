const express = require('express');
const router = express.Router();
const controlador = require('../../controllers/categoriaController');

router.get('/', controlador.listarCategorias);
router.get('/id/:id', controlador.obtenerCategoriaPorId);
router.get('/buscar/nombre/:nombre', controlador.obtenerCategoriaPorNombre)
router.post('/', controlador.crearCategoria);
router.put('/:id', controlador.editarCategoria);
router.delete('/:id', controlador.eliminarCategoria);


module.exports = router;
