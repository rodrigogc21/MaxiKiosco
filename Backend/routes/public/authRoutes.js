const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const usuarioController = require('../../controllers/usuarioController');

// Login
router.post('/login', authController.login);

// Registro de cliente
router.post('/registro', usuarioController.registrarCliente);

module.exports = router;
