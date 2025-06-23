const db = require('../config/db.js')
const bcrypt = require('bcrypt')

const getUsuarios = async () => {
    const result = await db.query('SELECT * FROM usuario')
    return result.rows
}

const getUsuarioById = async (id) => {
    const result = await db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id])
    return result.rows[0]
}

const getUsuarioByMail = async (correo) => {
    const result = await db.query('SELECT * FROM usuario WHERE correo_usuario = ?', [correo])
    return result.rows[0]
}


const registrarCliente = async ({nombre_usuario, apellido_usuario, correo_usuario, contraseña, direccion_usuario, telefono_usuario}) => {
    const hashedPassword = await bcrypt.hash(contraseña, 10)
    await db.query (
        'CALL insertar_usuario_cliente(?, ?, ?, ?, ?, ?)', [
            nombre_usuario, apellido_usuario, correo_usuario, hashedPassword, direccion_usuario, telefono_usuario            
        ]
    )
}
const crearUsuarioDesdeAdmin = async ({nombre_usuario, apellido_usuario, correo_usuario, contraseña, direccion_usuario, telefono_usuario, rol}) => {
    const hashedPassword = await bcrypt.hash(contraseña, 10)
    await db.query('CALL crear_usuario(?, ?, ?, ?, ?, ?, ?)', [
        nombre_usuario, apellido_usuario, correo_usuario, hashedPassword, direccion_usuario, telefono_usuario, rol
    ])
}

const actualizarUsuario = async (id_usuario, {nombre_usuario, apellido_usuario, correo_usuario, contraseña, direccion_usuario, telefono_usuario, rol}) => {
    await db.query('CALL actualizar_usuario(?, ?, ?, ?, ?, ?, ?, ?)', [
        id_usuario, nombre_usuario, apellido_usuario, correo_usuario, contraseña, direccion_usuario, telefono_usuario, rol
    ])
}

const eliminarUsuario = async (id_usuario) => {
    await db.query('CALL eliminar_usuario(?)', [id_usuario])
}

module.exports = {
    getUsuarios,
    getUsuarioById,
    getUsuarioByMail,
    registrarCliente,
    crearUsuarioDesdeAdmin,
    actualizarUsuario,
    eliminarUsuario
}
