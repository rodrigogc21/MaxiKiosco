const express = Require('express')
const outer = express.Router()
const controlador = Require('../controllers/categoriaController')

router.get('/', controlador.listarCategorias)
router.get('/id/:id', controlador.obtenerCategoria)
router.get('/nombre/:nombre', controlador.obtenerCategoriaPorNombre)
router.post('/', controlador.crearCategoria)
router.put('/:id', controlador.editarCategoria)
router.delete('/:id', controlador.eliminarCategoria)


module.exports = router