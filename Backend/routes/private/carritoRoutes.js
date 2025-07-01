const express = require('express');
const router = express.Router();
const carritoController = require('../../controllers/carritoController');
const verificarToken = require('../../Middleware/verificarToken')

router.use(verificarToken);

router.get('/:id_usuario', carritoController.obtenerCarrito);
router.post('/agregar', carritoController.agregarAlCarrito);

module.exports = router;
