const express = require('express');
const router = express.Router();
const productoController = require('../../controllers/productoController');
const verificarToken = require('../../Middleware/verificarToken')
const verificarRol = require('../../Middleware/verificarRol')

router.use(verificarToken)
router.use(verificarRol(['admin', 'empleado']))

router.post('/', productoController.crearProducto);
router.put('/:id', productoController.editarProducto);
router.delete('/:id', productoController.eliminarProducto);
router.get('/:id', productoController.obtenerProducto);

module.exports = router;
