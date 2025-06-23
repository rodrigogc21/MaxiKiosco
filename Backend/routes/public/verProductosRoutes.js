const express = require('express')
const router = express.Router()
const controlador = require('../../controllers/productoController')

router.get('/', controlador.listarProductos)
router.get('/:id', controlador.obtenerProducto)

module.exports = router
