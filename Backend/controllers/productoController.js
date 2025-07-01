const productoModel = require('../models/productoModel');

const listarProductos = async (req, res) => {
  try {
    const productos = await productoModel.getProductos();
    res.json(productos);
  } catch (error) {
    console.error('Error en listarProductos:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


const listarProductosPorCategoria = async (req, res) => {
    const {id} = req.params
  try {
    const productos = await productoModel.getProductosPorCategoria(id);
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos', error)
    res.status(500).json({ error: 'Error del servidor' });
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
        console.error('Error al obtener el producto', error)
        res.status(500).json({ error: 'Error del servidor' });
    }
};


const crearProducto = async (req, res) => {
    try {
        await productoModel.crearProducto(req.body);
        res.status(201).json({ mensaje: 'Producto creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el producto: ', error)
        res.status(500).json({ error: 'Error del servidor' });
    }
};

const editarProducto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID de producto inválido (NaN)' });
    }

    const {
      nombre_producto,
      descripcion_producto,
      precio_producto,
      stock,
      imagen_url,
      id_categoria,
      id_proveedor
    } = req.body;

    console.log('Datos recibidos:', req.body);
    console.log('ID recibido:', req.params.id)

    const parsed = {
      nombre_producto,
      descripcion_producto,
      precio_producto: parseFloat(precio_producto),
      stock: parseInt(stock),
      imagen_url,
      id_categoria: parseInt(id_categoria),
      id_proveedor: parseInt(id_proveedor)
    };

    console.log('Datos parseados antes de enviar al SP:', parsed);

    if (
      isNaN(parsed.precio_producto) ||
      isNaN(parsed.stock) ||
      isNaN(parsed.id_categoria) ||
      isNaN(parsed.id_proveedor)
    ) {
      console.error('Error: uno o más campos numéricos no son válidos');
      return res.status(400).json({ error: 'Datos numéricos inválidos (NaN)' });
    }

    await productoModel.actualizarProducto(parseInt(req.params.id), parsed)

        res.json({ mensaje: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el producto: ', error);

        if (error.sqlMessage) {
        return res.status(400).json({ error: error.sqlMessage });
        }

        res.status(500).json({ error: 'Error del servidor' })
    }
};

const eliminarProducto = async (req, res) => {
    try {
        await productoModel.eliminarProducto(req.params.id);
        res.json({ mensaje: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el producto', error)
        res.status(500).json({ error: 'Error del servidor' });
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
