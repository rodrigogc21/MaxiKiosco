const productoModel = require('../models/productoModel')

const listarProductos = async (req, res) => {
    const productos = await productoModel.getProducto()
    res.json(productos)
}

const obtenerProducto = async (req, res) => {
    const producto = await productoModel.getProductoById(req.params.id)
    producto ? res.json(producto) : res.status(404).json({error: 'Producto no encontrado'})
}

const crearProducto = async (req, res) => {
    await productoModel.crearProducto(req.body)
    res.status(201).json({mensaje: 'Producto creado exitosamente'})
}

const editarProducto = async (req, res) => {
    await productoModel.actualizarProducto(req.params.id, req.body)
    res.json({mensaje: 'Producto actaulizado exitosamente'})
}

const eliminarProducto = async (req, res) => {
    await productoModel.eliminarProducto(req.params.id)
    res.json({mensaje: 'Producto eliminado exitosamente'})
}

module.exports = {
    listarProductos,
    obtenerProducto,
    crearProducto,
    editarProducto,
    eliminarProducto
}    