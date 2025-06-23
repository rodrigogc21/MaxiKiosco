const jwt = Require('jsonwebtoken')

 export const verificarToken = (req, res, next) => {

    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({mensaje: 'Token requerido'})
    }

    const token = auth.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = decoded
        next()
    } catch (error) {
        res.status(401).json({mensaje: 'Token inválido'})
    }
}

module.exports = verificarToken