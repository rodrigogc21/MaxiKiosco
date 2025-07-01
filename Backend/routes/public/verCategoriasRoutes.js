const express = require('express');
const router = express.Router();
const controlador = require('../../controllers/categoriaController');

router.get('/', controlador.listarCategorias);
router.get('/id/:id', controlador.obtenerCategoriaPorId);
router.get('/buscar/nombre/:nombre', controlador.obtenerCategoriaPorNombre)

module.exports = router