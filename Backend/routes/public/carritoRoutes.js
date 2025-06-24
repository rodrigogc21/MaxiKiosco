const express = require('express');
const router = express.Router();
const controlador = require('../../controllers/carritoController');
const verificarToken = require('../../Middleware/verificarToken');
const verificarRol = require('../../Middleware/verificarRol');

router.get('/', verificarToken, verificarRol(['cliente']), controlador.obtenerCarrito)

module.exports = router;
