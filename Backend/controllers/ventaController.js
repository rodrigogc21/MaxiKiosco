const ventaModel = require('../models/ventaModel')

const procesarVenta = async (req, res) => {
    const {id_usuario, id_formaPago} = req.body

    try {
        const idVenta = await ventaModel.procesarCarrito(id_usuario, id_formaPago)
        res.status(201).json({mensaje: 'Venta procesada exitosamente', idVenta})
    } catch (error) {
        console.error('Error al procesar la venta', error)
        res.status(500).json({error: error.message || 'Error del servidor'})
    }
}

module.exports = {
    procesarVenta
}
