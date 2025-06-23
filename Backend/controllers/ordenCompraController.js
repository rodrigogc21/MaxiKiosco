const ordenCompraModel = require('../models/ordenCompraModel')

const crearOrden = async (req, res) => {
  try {
    const id_orden = await ordenCompraModel.crearOrdenCompra(req.body)
    res.status(201).json({ mensaje: 'Orden de compra creada', id_orden })
  } catch (error) {
    console.error('Error al crear orden:', error);
    res.status(500).json({error:'Error al crear orden de compra'})
  }
}

const listarOrdenes = async (req, res) => {
  const ordenes = await ordenCompraModel.getOrdenes()
  res.json(ordenes)
}

const obtenerOrdenPorId = async (req, res) => {
  try {
    const orden = await ordenCompraModel.getOrdenDetalleById(req.params.id)
    if (!orden) return res.status(404).json({mensaje:'Orden no encontrada'})
    res.json(orden)
  } catch (error) {
    res.status(500).json({error:'Error al obtener la orden'})
  }
}

const borrarOrden = async (req, res) => {
  try {
    await ordenCompraModel.eliminarOrdenCompra(req.params.id)
    res.json({mensaje:'Orden eliminada exitosamente'})
  } catch (error) {
    res.status(500).json({error: 'Error al eliminar la orden'})
  }
}

module.exports = {
  crearOrden,
  listarOrdenes,
  obtenerOrdenPorId,
  borrarOrden
}
