const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        const rol = req.usuario.rol
        if (!rolesPermitidos.includes(rol)) {
            return res.status(403).json({mensaje: 'Acceso denegado: Rol no autorizado'})
        }
        next()
    }
}

module.exports = verificarRol