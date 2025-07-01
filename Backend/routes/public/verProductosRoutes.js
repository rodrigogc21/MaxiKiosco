const express = require('express');
const router = express.Router();
const productoController = require('../../controllers/productoController');

router.get('/', productoController.listarProductos)
router.get('/categoria/:id', productoController.listarProductosPorCategoria)
router.get('/:id', productoController.obtenerProducto)

module.exports = router;
