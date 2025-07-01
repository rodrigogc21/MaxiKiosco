const db = require('../config/db.js');

const getProductos = async () => {
  const [rows] = await db.query('SELECT * FROM producto');
  return rows;
};

const getProductoById = async (id_producto) => {
  const [rows] = await db.query('SELECT * FROM producto WHERE id_producto = ?', [id_producto]);
  return rows[0];
};

const getProductosPorCategoria = async (id_categoria) => {
  const [rows] = await db.query('SELECT * FROM producto WHERE id_categoria = ?', [id_categoria]);
  return rows;
};


const crearProducto = async ({ nombre_producto, descripcion_producto, precio_producto, stock, imagen_url, id_categoria, id_proveedor }) => {
  await db.query('CALL insertar_producto (?, ?, ?, ?, ?, ?, ?)', [
    nombre_producto, descripcion_producto, precio_producto, stock, imagen_url, id_categoria, id_proveedor
  ]);
};

const actualizarProducto = async (id_producto, {
  nombre_producto,
  descripcion_producto,
  precio_producto,
  stock,
  imagen_url,
  id_categoria,
  id_proveedor
}) => {
  await db.query('CALL actualizar_producto (?, ?, ?, ?, ?, ?, ?, ?)', [
    id_producto,
    nombre_producto,
    descripcion_producto,
    precio_producto,
    stock,
    imagen_url,
    id_categoria,
    id_proveedor
  ])
}

const eliminarProducto = async (id_producto) => {
  await db.query('CALL eliminar_producto(?)', [id_producto]);
}

module.exports = {
  getProductos,
  getProductoById,
  getProductosPorCategoria,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
