const db = require('../config/db.js')

const getCategorias = async () => {
  const [rows] = await db.query('SELECT * FROM categoria')
  return rows;
};

const getCategoriaById = async (id_categoria) => {
    const result = await db.query('SELECT * FROM categoria WHERE id_categoria = ?', [id_categoria])
    return result.rows[0]
}

const getCategoriaByNombre = async (nombre_categoria) => {
    const result = await db.query('SELECT * FROM categoria WHERE nombre_categoria = ?', [nombre_categoria])
    return result.rows[0]
}

const crearCategoria = async ({nombre_categoria, descripcion}) => {
    const [result] = await db.query(`INSERT INTO categoria (nombre_categoria, descripcion) VALUES (?, ?)`, [
        nombre_categoria, descripcion
    ]
    )
}

const actualizarCategoria = async (id_categoria, {nombre_categoria, descripcion}) => {
    await db.query('CALL actualizar_categoria (?, ?, ?)', [id_categoria, nombre_categoria, descripcion])
}

const eliminarCategoria = async (id_categoria) => {
    const [rows] = await db.query(`SELECT 1 FROM categoria WHERE id_categoria = ?`, [
        id_categoria
    ]
  )
  if (rows.length === 0) {
    throw new Error('La categoría que intenta eliminar no existe')
  }
  
  await db.query(`DELETE FROM categoria WHERE id_categoria = ?`, [id_categoria])
}

module.exports = {
    getCategorias,
    getCategoriaById,
    getCategoriaByNombre,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};
