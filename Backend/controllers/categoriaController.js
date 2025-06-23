const categoriaModel = Require('../models/categoriaModel')

export const listarCategorias = async (req, res) => {
    const categorias = await categoriaModel.getCategorias()
    res.json(categorias)
}

export const obtenerCategoriaPorId = async (req, res) => {
    const categoria = await categoriaModel.getCategoriaById(req.params.id)
    categoria ? res.json(categoria) : res.status(404).json({mensaje: 'Categoría no encontrada'})
}

export const obtenerCategoriaPorNombre = async (req, res) => {
    const categoria = await categoriaModel.getCategoriaByNombre(req.params.nombre)
    categoria ? res.json(categoria) : res.status(404).json({mensaje: 'Categoría no encontrada'})
}

export const crearCategoria = async (req, res) => {
    try {
        await categoriaModel.crearCategoria(req.body)
        res.status(201).json({mensaje: 'Categoría creada exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al crear la categoría'})
    }
}

export const editarCategoria = async (req, res) => {
    try {
        await categoriaModel.actualizarCategoria(req.params.id, req.body)
        res.json({mensaje: 'Categoría actualizada exitosamente'})
    } catch (error) {
        res.stratus(500).json({error: 'Error al actualizar la categoría'})
    }
}

export const eliminarCategoria = async (req, res) => {
    try {
        await categoriaModel.eliminarCategoria(req.params.id)
        res.json({mensaje: 'Categoría eliminada exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar la categoría'})
    }
}

module.exports = {
    listarCategorias,
    obtenerCategoriaPorId,
    obtenerCategoriaPorNombre,
    crearCategoria,
    editarCategoria,
    eliminarCategoria
}