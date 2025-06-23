const ventaModel = require('../models/ventaModel')

const procesarCarrito = async (req, res) => {
    try {
        const id_usuario = req.usuario.id_usuario
        const {id_formaPago} = req.body

        if (!id_formaPago) {
            return res.status(400).json({mensaje: 'Debe indicar una forma de pago'})
        }

        const id_venta = await ventaModel.procesarCarrito(id_usuario, id_formaPago)

        if(!id_venta) {
            return res.status(404).json({mensaje: 'No se pudo procesar el carrito'})
        }

        res.status(201).json({mensaje: 'Carrito procesado exitosamente', id_venta})
    } catch (error) {
        console.error('Error al procesar carrito: ', error)
        res.status(500).json({error: 'Error al procesar el carrito'})
    }
}

module.exports = {
    procesarCarrito
}

