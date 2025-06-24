const modelo = require('../models/carritoModel')

const obtenerCarrito = async (req, res) => {
  try {
    const id_usuario = req.usuario.id_usuario;
    const data = await modelo.getCarritoAbierto(id_usuario);

    if (!data) {
      return res.status(404).json({mensaje: 'No hay un carrito abierto'})
    }

    res.json(data);
  } catch (err) {
    console.error('Error al obtener carrito:', err);
    res.status(500).json({ mensaje: 'Error al consultar el carrito' });
  }
}

module.exports = {
  obtenerCarrito
};
