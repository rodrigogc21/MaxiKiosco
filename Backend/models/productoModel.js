const db = require('../config/db.js')
const { get } = require('../routes/public/verProductosRoutes.js')

const getProductos = async() => {
    const result = await db.query('SELECT * FROM producto')
    return result.rows
}

const getProductoById = async(id_producto) => {
    const result = await db.query('SELECT * FROM producto WHERE id_producto = ?', [id_producto])
    return result.rows[0]
}

const crearProducto = async({nombre_producto, descripcion_producto, precio_producto, stock, imagen_url, id_categoria, id_proveedor}) => {
    await db.query('CALL insertar_producto (?, ?, ?, ?, ?, ?, ?)',  
        [nombre_producto, descripcion_producto, precio_producto, stock, imagen_url, id_categoria, id_proveedor]
    )
}


const actualizarProducto = async(id_producto, {nombre_producto, descripcion_producto, precio_producto, stock, imagen_url, id_categoria, id_proveedor}) => {
    await db.query('CALL actualizar_producto (?, ?, ?, ?, ?, ?, ?)', 
        [id_producto, nombre_producto, descripcion_producto, precio_producto, stock, imagen_url, id_categoria, id_proveedor]
    )
}

const eliminarProducto = async(id_producto) => {
    await db.query('CALL eliminar_producto(?)', [id_producto])
}



module.exports = {
    getProductos,
    getProductoById,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}



const probarConexion = async () => {
    const [rows] = await db.query('SELECT 1 + 1 as resultado')
    console.log('Conexión OK. Resultado: ', rows[0].resultado)
}

probarConexion()
