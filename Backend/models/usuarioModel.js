const db = require('../config/db.js')
const bcrypt = require('bcrypt')

const getUsuarios = async () => {
    const result = await db.query('SELECT id_usuario, nombre, apellido, correo, direccion, telefono, rol FROM usuario')
    return result.rows
}

const getUsuarioById = async (id) => {
    const result = await db.query('SELECT id_usuario, nombre, apellido, correo, direccion, telefono, rol FROM usuario WHERE id_usuario = ?', [id])
    return result.rows[0]
}

const getUsuarioByMail = async (correo) => {
    const result = await db.query('SELECT id_usuario, nombre, apellido, correo, direccion, telefono, rol FROM usuario WHERE correo = ?', [correo])
    return result.rows[0]
}

const crearUsuario = async ({nombre, apellido, correo, contraseña, direccion, telefono, rol}) => {
    const hashedPassword = await bcrypt.hash(contraseña, 10)
    await db.query(
        'INSERT INTO usuario (nombre, apellido, correo, contraseña, direccion, telefono, rol) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellido, correo, hashedPassword, direccion, telefono, rol || 'cliente'] // Default role is 'cliente' if not provided
    )
}

const actualizarUsuario = async (id, {nombre, apellido, correo, direccion, telefono, rol}) => {
    const query = 'UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, direccion = ?, telefono = ?, rol = ?'
    const params = [nombre, apellido, correo, direccion, telefono, rol]
    if (contraseña) {
        const hashedPassword = await bcrypt.hash(contraseña, 10)
        query += 'contraseña = ?'
        params.push(hashedPassword)
    }

    query += ' WHERE id_usuario = ?'
    params.push(id)

    await db.query(query, params)
}

const eliminarUsuario = async (id) => {
    await db.query('DELETE FROM usuario WHERE id_usuario = ?', [id])
}

module.exports = {
    getUsuarios,
    getUsuarioById,
    getUsuarioByMail,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}
