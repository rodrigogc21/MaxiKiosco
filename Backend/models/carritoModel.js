const db = require('../config/db');

const obtenerCarritoDB = async (id_usuario) => {
  const [carrito] = await db.query(`
    SELECT cd.id_producto, p.nombre_producto, cd.cantidad, cd.precio_unitario, cd.subtotal
    FROM carritoDetalle cd
    JOIN carrito c ON c.id_carrito = cd.id_carrito
    JOIN producto p ON p.id_producto = cd.id_producto
    WHERE c.id_usuario = ? AND c.estado = 'abierto'
    ORDER BY cd.id_carritoDetalle
  `, [id_usuario])

  return carrito;
};

const obtenerOCrearCarrito = async (id_usuario) => {
  const [carritos] = await db.query(`
    SELECT id_carrito FROM carrito
    WHERE id_usuario = ? AND estado = 'abierto'
    LIMIT 1
  `, [id_usuario]);

  if (carritos.length > 0) return carritos[0].id_carrito;

  const [insert] = await db.query(
  `INSERT INTO carrito (id_usuario, estado, fecha_creacion)
    VALUES (?, 'abierto', NOW())`,
     [id_usuario]);

  return insert.insertId;
};

const insertarCarritoDetalle = async ({ id_carrito, id_producto, cantidad, precio_unitario, subtotal }) => {
  await db.query(`
    INSERT INTO carritoDetalle (id_carrito, id_producto, cantidad, precio_unitario, subtotal)
    VALUES (?, ?, ?, ?, ?)
  `, [id_carrito, id_producto, cantidad, precio_unitario, subtotal]);
};

const vaciarCarrito = async (id_usuario) => {
  const [carritos] = await db.query(`
    SELECT id_carrito FROM carrito WHERE id_usuario = ? AND estado = 'abierto'
  `, [id_usuario]);

  if (carritos.length === 0) return;

  const id_carrito = carritos[0].id_carrito;

  await db.query(`
    DELETE FROM carritoDetalle WHERE id_carrito = ?
  `, [id_carrito]);
};

module.exports = {
  obtenerCarritoDB,
  obtenerOCrearCarrito,
  insertarCarritoDetalle,
  vaciarCarrito
};
