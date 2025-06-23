const ventaModel = require('../models/ventaModel')

const procesarVentaDesdeCarrito = async (req, res) => {
    const {id_usuario, id_formaPago} = req.body

    try {
        const id_venta = await ventaModel.procesarCarrito(id_usuario, id_formaPago)
        res.status(201).json({mensaje: 'Venta procesada exitosamente', id_venta})
    } catch (error) {
        console.error('Error al procesar carrito: ', error)
        res.status(500).json({error: 'Error al procesar la venta'})
    }
}

module.exports = {
    procesarVentaDesdeCarrito
}
