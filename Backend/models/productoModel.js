const db = require('../config/db.js')

const getProducto = async() => {
    const result = await db.query('SELECT * FROM producto')
    return result.rows
}

const getProductoById = async(id) => {
    const result = await db.query('SELECT * FROM producto WHERE id = ?', [id])
    return result.rows[0]
}

const crearProducto = async({nombre, precio, stock}) => {
    await db.query('INSERT INTO producto (nombre, precio stock) VALUES (?, ?, ?)', [nombre, precio, stock])
}


const actualizarProducto = async(id, {nombre, precio, stock}) => {
    await db.query('UPDATE producto SET nombre = ?, precio = ?, stock = ? WHERE id = ?', [nombre, precio, stock, id])
}

const eliminarProducto = async(id) => {
    await db.query('DELETE FROM producto WHERE id = ?', [id])
}

module.exports = {
    getProducto,
    getProductoById,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}