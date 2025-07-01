const db = require('../config/db.js')

const getUsuarios = async () => {
    const [rows] = await db.query('SELECT * FROM usuario')
    return rows
}

const getUsuarioById = async (id_usuario) => {
    const [rows] = await db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario])
    return rows[0]
}

const getUsuarioByMail = async (correo_usuario) => {
    const [rows] = await db.query('SELECT * FROM usuario WHERE correo_usuario = ?', [correo_usuario])
    return rows[0]
}

const loginUsuario = async (correo_usuario, contraseña) => {
    const [rows] = await db.query(
        'SELECT id_usuario, nombre_usuario, correo_usuario, rol FROM usuario WHERE correo_usuario = ? AND contraseña = ?', 
        [correo_usuario, contraseña]
    )
        return rows[0]
    }

const registrarCliente = async ({nombre_usuario, apellido_usuario, correo_usuario, contraseña, direccion_usuario, telefono_usuario}) => {
    await db.query(
        'CALL insertar_usuario_cliente(?, ?, ?, ?, ?, ?)',
        [nombre_usuario, apellido_usuario, correo_usuario, contraseña, direccion_usuario, telefono_usuario]
    )
}

const crearUsuarioDesdeAdmin = async ({nombre_usuario, apellido_usuario, correo_usuario, contraseña, direccion_usuario, telefono_usuario, rol}) => {
    await db.query('CALL crear_usuario(?, ?, ?, ?, ?, ?, ?)', [
        nombre_usuario, apellido_usuario, correo_usuario, contraseña, direccion_usuario, telefono_usuario, rol
    ])
}

const actualizarUsuario = async (id_usuario, {nombre_usuario, apellido_usuario, correo_usuario, contraseña, direccion_usuario, telefono_usuario}) => {
    try {
    await db.query('CALL actualizar_usuario(?, ?, ?, ?, ?, ?, ?)', [
        id_usuario, nombre_usuario, apellido_usuario, correo_usuario, contraseña, direccion_usuario, telefono_usuario
    ])
    } catch (error) {
        console.error('Error en SP actualizar_usuario', error)
        throw error
    }
}

const eliminarUsuario = async (id_usuario) => {
    await db.query('CALL eliminar_usuario(?)', [id_usuario])
}

module.exports = {
    getUsuarios,
    getUsuarioById,
    getUsuarioByMail,
    loginUsuario,
    registrarCliente,
    crearUsuarioDesdeAdmin,
    actualizarUsuario,
    eliminarUsuario
}
