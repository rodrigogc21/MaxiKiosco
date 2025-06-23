const jwt = Require('jsonwebtoken')
const bcrypt = Require('bcrypt')
const usuarioModel = Require('../models/usuarioModel')

const login = async (req, res) =>  {
    const {correo, contraseña} = req.body

    try {
        const usuario = await usuarioModel.getUsuarioByMail(correo)
        if (!usuario) {
            return res.status(404).json({error: 'Usuario no encontrado'})
        }

        const coincide = await bcrypt.compare(contraseña, usuario.contraseña)
        if (!coincide) {
            return res.status(401).json({error: 'Contraseña incorrecta'})
        }

        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre_usuario,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {expiresIn: '2h'}
        )

        res.json({mensaje: 'Inicio de sesión exitoso', token})
    } catch (error) {
        res.statuds(500).json({error: 'Error al iniciar sesión'})
    }
}