const jwt = require('jsonwebtoken')
const JWT_SECRET = 'CLAVE_SECRETA_JWT'

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    console.log('Token decodificado:', decoded)
    req.usuario = decoded
    next();
  });
};

module.exports = verificarToken;
