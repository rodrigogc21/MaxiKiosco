const usuarioModel = require('../models/usuarioModel')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'CLAVE_SECRETA_JWT'

const login = async (req, res) =>  {
    const { correo_usuario, contraseña } = req.body 

    try {
        const usuario = await usuarioModel.getUsuarioByMail(correo_usuario)

        if (!usuario) {
            return res.status(404).json({ error: 'Correo no registrado' })
        }

        if (usuario.contraseña !== contraseña) {
            return res.status(401).json({error: 'Contraseña incorrecta'})
        }

        const token = jwt.sign (
            { 
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre_usuario,
                rol: usuario.rol
            },
            JWT_SECRET,
            { expiresIn: '2h' }
        )

        res.json({
            id_usuario: usuario.id_usuario,
            nombre_usuario: usuario.nombre_usuario,
            correo_usuario: usuario.correo_usuario,
            rol: usuario.rol,
            token: token
        })

    } catch (error) {
        console.error('Error al inciar sesión:', error)
        res.status(500).json({ error: 'Error del servidor' })
    }
}

module.exports = {
    login
}
