const productoModel = require('../models/productoModel');

const listarProductos = async (req, res) => {
  try {
    const productos = await productoModel.getProductos();
    res.json(productos);
  } catch (error) {
    console.error('Error en listarProductos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const listarProductosPorCategoria = async (req, res) => {
  try {
    const idCategoria = req.params.id;
    const productos = await productoModel.getProductosPorCategoria(idCategoria);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos por categoría' });
  }
};


const obtenerProducto = async (req, res) => {
    try {
        const producto = await productoModel.getProductoById(req.params.id);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};


const crearProducto = async (req, res) => {
    try {
        await productoModel.crearProducto(req.body);
        res.status(201).json({ mensaje: 'Producto creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

const editarProducto = async (req, res) => {
    try {
        await productoModel.actualizarProducto(req.params.id, req.body);
        res.json({ mensaje: 'Producto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        await productoModel.eliminarProducto(req.params.id);
        res.json({ mensaje: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

module.exports = {
    listarProductos,
    listarProductosPorCategoria,
    obtenerProducto,
    crearProducto,
    editarProducto,
    eliminarProducto
};
