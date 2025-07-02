const carritoModel = require('../models/carritoModel');
const productoModel = require('../models/productoModel');

const obtenerCarrito = async (req, res) => {
  try {
    const id_usuario = req.params.id;
    const carrito = await carritoModel.obtenerCarritoDB(id_usuario);
    res.json(carrito);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const vaciarCarrito = async (req, res) => {
  try {
    const id_usuario = req.params.id;
    await carritoModel.vaciarCarrito(id_usuario);
    res.json({ success: true, mensaje: 'Carrito vaciado correctamente' });
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const agregarAlCarrito = async (req, res) => {
  try {
    const { id_usuario, id_producto, cantidad } = req.body;

    const id_carrito = await carritoModel.obtenerOCrearCarrito(id_usuario);

    const [producto] = await productoModel.getProductoById(id_producto);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    const precio_unitario = producto.precio_producto;
    const subtotal = precio_unitario * cantidad;

    await carritoModel.insertarCarritoDetalle({
      id_carrito,
      id_producto,
      cantidad,
      precio_unitario,
      subtotal
    });

    res.status(201).json({ mensaje: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error del servidor' })
  }
}

module.exports = {
  obtenerCarrito,
  vaciarCarrito,
  agregarAlCarrito
};
