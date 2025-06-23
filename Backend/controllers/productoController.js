const productoModel = Require('../models/productoModel')


export const listarProductos = async (req, res) => {
    const productos = await productoModel.getProductos()
    res.json(productos)
}

export const obtenerProducto = async (req, res) => {
    const producto = await productoModel.getProductoById(req.params.id)
    producto ? res.json(producto) : res.status(404).json({error: 'Producto no encontrado'})
}

export const crearProducto = async (req, res) => {
    try {
    await productoModel.crearProducto(req.body)
    res.status(201).json({mensaje: 'Producto creado exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al crear el producto'})
    }
}

export const editarProducto = async (req, res) => {
    try {
    await productoModel.actualizarProducto(req.params.id, req.body)
    res.json({mensaje: 'Producto actualizado exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al actualaizar el producto'})
    }
}

export const eliminarProducto = async (req, res) => {
    try {
    await productoModel.eliminarProducto(req.params.id)
    res.json({mensaje: 'Producto eliminado exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el producto'})
    }
}


module.exports = {
    listarProductos,
    obtenerProducto,
    crearProducto,
    editarProducto,
    eliminarProducto
}    