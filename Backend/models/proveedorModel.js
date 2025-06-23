const db = require('../config/db.js')

const getProveedores = async () => {
    const result = await db.query('SELECT * FROM proveedor')
    return result.rows
}

const getProveedorById = async (id_proveedor) => {
    const result = await db.query ('SELECT * FROM proveedor WHERE id_proveedor = ?', [id_proveedor])
    return result.rows[0]
}

const crearProveedor = async ({razonSocial, cuit, correo_proveedor, direccion_proveedor, telefono_proveedor}) => {
    await db.query('CALL insertar_proveedor (?, ?, ?, ?, ?)', 
        [razonSocial, cuit, correo_proveedor, direccion_proveedor, telefono_proveedor]
    )
}

const actualizarProveedor = async (id_proveedor, {razonSocial, cuit, correo_proveedor, direccion_proveedor, telefono_proveedor}) => {
    await db.query('CALL actualizar_proveedor (?, ?, ?, ?, ?, ?)'), [
        id_proveedor, razonSocial, cuit, correo_proveedor, direccion_proveedor, telefono_proveedor
    ]
}

const eliminarProveedor = async (id_proveedor) => {
    await db.query('CALL eliminar_proveedor (?)', [id_proveedor])
}

module.exports = {
    getProveedores,
    getProveedorById,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
}
