const db = require('../config/db.js')

const procesarCarrito = async (id_usuario, id_formaPago) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [[carrito]] = await connection.query(
      `SELECT id_carrito 
       FROM carrito 
       WHERE id_usuario = ? AND estado = 'abierto' 
       ORDER BY fecha_creacion DESC 
       LIMIT 1`, 
      [id_usuario]
    );

    if (!carrito) throw new Error('No se encontró un carrito abierto');

    const id_carrito = carrito.id_carrito;

    const [[{ total }]] = await connection.query(
      `SELECT SUM(subtotal) AS total 
       FROM carritoDetalle 
       WHERE id_carrito = ?`, 
      [id_carrito]
    );

    if (!total) throw new Error('No se pudo calcular el total del carrito');

    const [ventaResult] = await connection.query(
      `INSERT INTO venta (fecha, total, id_usuario, id_formaPago)
       VALUES (NOW(), ?, ?, ?)`,
      [total, id_usuario, id_formaPago]
    );

    const id_venta = ventaResult.insertId;

    await connection.query(
      `INSERT INTO detalleVenta (id_venta, id_producto, cantidad, precio_unitario, subtotal)
       SELECT ?, id_producto, cantidad, precio_unitario, subtotal
       FROM carritoDetalle
       WHERE id_carrito = ?`,
      [id_venta, id_carrito]
    );

    await connection.query(
      `UPDATE producto p
       JOIN carritoDetalle cd ON p.id_producto = cd.id_producto
       SET p.stock = p.stock - cd.cantidad
       WHERE cd.id_carrito = ?`,
      [id_carrito]
    );

    await connection.query(
      `UPDATE carrito 
       SET estado = 'procesado' 
       WHERE id_carrito = ?`,
      [id_carrito]
    );

    await connection.commit();
    connection.release();

    return id_venta;

  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error('Error al procesar carrito:', error);
    throw error;
  }
};

module.exports = {
  procesarCarrito
};