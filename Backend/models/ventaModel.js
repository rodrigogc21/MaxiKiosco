const db = require('../config/db.js')

const procesarCarrito = async (id_usuario, id_formaPago) => {
    await db.query('CALL procesar_carrito(?, ?, @p_id_venta)', [id_usuario, id_formaPago])

    const [[result]] = await db.query('SELECT @p_id_venta as id_venta')

    return result.id_venta
}

module.exports = {
    procesarCarrito
}
