const express = require('express');
const router = express.Router();
const productoController = require('../../controllers/productoController');

// Crear producto
router.post('/', productoController.crearProducto);

// Editar producto
router.put('/:id', productoController.editarProducto);

// Eliminar producto
router.delete('/:id', productoController.eliminarProducto);

// Obtener producto por ID
router.get('/:id', productoController.obtenerProducto);

module.exports = router;
