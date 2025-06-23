const express = Require('express')
const router = express.Router()
const controlador = Require('../controllers/productoController')

router.get('/', controlador.listarProductos)
router.get('/:id', controlador.obtenerProducto)