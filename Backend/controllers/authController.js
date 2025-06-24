const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usuarioModel = require('../models/usuarioModel')

const login = async (req, res) =>  {
    const { correo_usuario, contraseña } = req.body  // <-- acá el cambio

    try {
        const usuario = await usuarioModel.getUsuarioByMail(correo_usuario)
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        const coincide = await bcrypt.compare(contraseña, usuario.contraseña)
        if (!coincide) {
            return res.status(401).json({ error: 'Contraseña incorrecta' })
        }

        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre_usuario,
                rol: usuario.rol
            },
            process.env.JWT_SECRET || 'tu_secreto_aqui',
            { expiresIn: '2h' }
        )

        res.json({ token })  // Devuelve solo el token
    } catch (error) {
        console.error('Error en login:', error)
        res.status(500).json({ error: 'Error al iniciar sesión' })
    }
}

module.exports = {
    login
}
