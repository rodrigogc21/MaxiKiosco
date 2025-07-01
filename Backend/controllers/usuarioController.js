const usuarioModel = require('../models/usuarioModel')

const listarUsuarios = async (req, res) => {
    const usuarios = await usuarioModel.getUsuarios()
    res.json(usuarios)
}

const obtenerUsuario = async (req, res) => {
    const usuario = await usuarioModel.getUsuarioById(req.params.id)
    usuario ? res.json(usuario) : res.status(404).json({mensaje: 'Usuario no encontrado'})
}

const registrarCliente = async (req, res) => {
  try {
    const datos = req.body
    await usuarioModel.registrarCliente({ ...datos, correo: datos.correo_usuario, contraseña: datos.contraseña })
    res.status(201).json({ mensaje: 'Cliente registrado exitosamente' })
  } catch (error) {
    console.error('Error en registrarCliente:', error)
    res.status(500).json({ error: 'Error al registrar el cliente' })
  }
}


const crearUsuarioDesdeAdmin = async (req, res) => {
    try {
        const datos = req.body

        await usuarioModel.crearUsuarioDesdeAdmin({...datos, contraseña: datos.contraseña})

        res.status(201).json({mensaje: 'Usuario creado por el administrador exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al crear el usuario'})
    }
}

const editarUsuario = async (req, res) => {
    try {
        await usuarioModel.actualizarUsuario(req.params.id, req.body)
        res.json({mensaje: 'Usuario actualizado exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar el usuario'})
    }
}

const eliminarUsuario = async (req, res) => {
    try {
        await usuarioModel.eliminarUsuario(req.params.id)
        res.json({mensaje: 'Usuario eliminado exitosamente'})
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el usuario'})
    }
}

module.exports = {
    listarUsuarios,
    obtenerUsuario,
    registrarCliente,
    crearUsuarioDesdeAdmin, 
    editarUsuario,
    eliminarUsuario
}
