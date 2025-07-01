const categoriaModel = require('../models/categoriaModel')

const listarCategorias = async (req, res) => {
    try {
      const categorias = await categoriaModel.getCategorias();
      res.json(categorias);
    } catch (error) {
      console.error(error)
      res.status(500).json({error: 'Error al obtener categorías'})
    }
}

const obtenerCategoriaPorId = async (req, res) => {
    const categoria = await categoriaModel.getCategoriaById(req.params.id)
    categoria ? res.json(categoria) : res.status(404).json({mensaje: 'Categoría no encontrada'})
}

const obtenerCategoriaPorNombre = async (req, res) => {
    const categoria = await categoriaModel.getCategoriaByNombre(req.params.nombre)
    categoria ? res.json(categoria) : res.status(404).json({mensaje: 'Categoría no encontrada'})
}

const crearCategoria = async (req, res) => {
    try {
        await categoriaModel.crearCategoria(req.body)
        res.status(201).json({mensaje: 'Categoría creada exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al crear la categoría'})
    }
}

const editarCategoria = async (req, res) => {
    try {
        await categoriaModel.actualizarCategoria(req.params.id, req.body)
        res.json({mensaje: 'Categoría actualizada exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar la categoría'})
    }
}

const eliminarCategoria = async (req, res) => {
    try {
        await categoriaModel.eliminarCategoria(req.params.id)
        res.json({mensaje: 'Categoría eliminada exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar la categoría'})
    }
}

const crearProducto = async (req, res) => {
  try {
    await productoModel.crearProducto(req.body);
    res.status(201).json({ mensaje: 'Producto creado exitosamente' });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};


module.exports = {
    listarCategorias,
    obtenerCategoriaPorId,
    obtenerCategoriaPorNombre,
    crearCategoria,
    editarCategoria,
    eliminarCategoria,
    crearProducto
}
