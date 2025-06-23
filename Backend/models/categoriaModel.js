const db = require('../config/db.js')

const getCategorias = async () => {
    const result = await db.query('SELECT * FROM categoria')
    return result.rows
}

const getCategoriaById = async (id_categoria) => {
    const result = await db.query('SELECT * FROM categoria WHERE id_categoria = ?', [id_categoria])
    return result.rows[0]
}

const getCategoriaByNombre = async (nombre_categoria) => {
    const result = await db.query('SELECT * FROM categoria WHERE nombre_categoria = ?', [nombre_categoria])
    return result.rows[0]
}

const crearCategoria = async ({nombre_categoria, descripcion_categoria}) => {
    await db.query('CALL insertar_categoria (?, ?)', [nombre_categoria, descripcion_categoria]
    )
}

const actualizarCategoria = async (id_categoria, {nombre_categoria, descripcion_categoria}) => {
    await db.query('CALL actualizar_categoria (?, ?, ?)', [id_categoria, nombre_categoria, descripcion_categoria])
}

const eliminarCategoria = async (id_categoria) => {
    await db.query('Call eliminar_categoria (?)', [id_categoria])
}

module.exports = {
    getCategorias,
    getCategoriaById,
    getCategoriaByNombre,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}
