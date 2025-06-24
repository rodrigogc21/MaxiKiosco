const express = require('express');
const router = express.Router();
const productoController = require('../../controllers/productoController');


router.get('/productos', productoController.listarProductos);
router.get('/productos/categoria/:id', productoController.listarProductosPorCategoria);
router.get('/productos/:id', productoController.obtenerProducto);


module.exports = router;
