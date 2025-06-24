const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const usuarioController = require('../../controllers/usuarioController');


router.post('/login', authController.login);
router.post('/registro', usuarioController.registrarCliente);

module.exports = router;
