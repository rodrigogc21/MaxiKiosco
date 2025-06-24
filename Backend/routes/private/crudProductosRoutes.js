const express = require('express');
const router = express.Router();
const productoController = require('../../controllers/productoController');


router.post('/', productoController.crearProducto);
router.put('/:id', productoController.editarProducto);
router.delete('/:id', productoController.eliminarProducto);
router.get('/:id', productoController.obtenerProducto);

module.exports = router;
