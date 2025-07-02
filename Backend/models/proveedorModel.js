const db = require('../config/db.js')

const getProveedores = async () => {
    const [rows] = await db.query('SELECT * FROM proveedor')
    return rows
}

const getProveedorById = async (id_proveedor) => {
    const result = await db.query ('SELECT * FROM proveedor WHERE id_proveedor = ?', [id_proveedor])
    return result.rows[0]
}

const crearProveedor = async ({razonSocial, cuit, correo_proveedor, direccion_proveedor, telefono_proveedor}) => {
    await db.query(`INSERT INTO proveedor (
        razonSocial,
        cuit,
        correo_proveedor,
        direccion_proveedor,
        telefono_proveedor
        ) VALUES (?, ?, ?, ?, ?)`, [
            razonSocial, cuit, correo_proveedor, direccion_proveedor, telefono_proveedor
        ])
}

const actualizarProveedor = async (id_proveedor, {razonSocial, cuit, correo_proveedor, direccion_proveedor, telefono_proveedor}) => {
    await db.query(`UPDATE proveedor SET
        razonSocial = ?,
        cuit = ?,
        correo_proveedor = ?,
        direccion_proveedor = ?,
        telefono_proveedor = ?
        WHERE id_proveedor = ?`, [
        razonSocial, cuit, correo_proveedor, direccion_proveedor, telefono_proveedor, id_proveedor
    ])
}

const eliminarProveedor = async (id_proveedor) => {
    const [rows] = await db.query(`SELECT 1 FROM proveedor WHERE id_proveedor = ?`, [
        id_proveedor
    ]
  )
  if (rows.length === 0) {
    throw new Error('El proveedor que intenta eliminar no existe')
  }
  await db.query(`DELETE FROM proveedor WHERE id_proveedor = ?`, [id_proveedor])
}

module.exports = {
    getProveedores,
    getProveedorById,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
}
