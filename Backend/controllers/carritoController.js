const carritoModel = require('../models/carritoModel');

const obtenerCarrito = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const carrito = await carritoModel.obtenerCarritoDB(id_usuario);
    res.json(carrito);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const agregarAlCarrito = async (req, res) => {
  const { id_usuario, id_producto, cantidad } = req.body;

  try {
    const id_carrito = await carritoModel.obtenerOCrearCarrito(id_usuario);

    const producto = await carritoModel.obtenerPrecioProducto(id_producto);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const precio_unitario = producto.precio_producto
    const subtotal = precio_unitario * cantidad

    await carritoModel.insertarCarritoDetalle({
      id_carrito,
      id_producto,
      cantidad,
      precio_unitario,
      subtotal
    });

    res.json({ message: 'Producto agregado al carrito', id_carrito });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  obtenerCarrito,
  agregarAlCarrito
};
