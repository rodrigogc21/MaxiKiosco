const proveedorModel = require('../models/proveedorModel')

const listarProveedores = async (req, res) => {
    const proveedores = await proveedorModel.getProveedores()
    res.json(proveedores) 
}

const obtenerProveedor = async (req, res) => {
    const proveedor = await proveedorModel.getProveedorById(req.params.id)
    proveedor ? res.json(proveedor) : res.status(404).json({mensaje: 'Proveedor no encontrado'})
}

const crearProveedor = async (req, res) => {
    try {
        await proveedorModel.crearProveedor(req.body)
        res.status(201).json({mensaje: 'Proveedor creado exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al crear el proveedor'})
    }
}

const editarProveedor = async (req, res) => {
    try {
        await proveedorModel.actualizarProveedor(req.params.id, req.body)
        res.json({mensaje: 'Proveedor actualizado exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar el proveedor'})
    }
}

const eliminarProveedor = async (req, res) => {
    try {
        await proveedorModel.eliminarProveedor(req.params.id)
        res.json({mensaje: 'Proveedor eliminado exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el proveedor'})
    }
}

module.exports = {
    listarProveedores,
    obtenerProveedor,
    crearProveedor,
    editarProveedor,
    eliminarProveedor
}
