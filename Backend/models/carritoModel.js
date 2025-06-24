const db = require('../config/db');

const getCarritoAbierto = async (id_usuario) => {

  const [[carrito]] = await db.query(
    `SELECT id_carrito FROM carrito WHERE id_usuario = ? AND estado = 'abierto' ORDER BY fecha_creacion DESC LIMIT 1`,
    [id_usuario]
  )

  if (!carrito) return null;


  const [productos] = await db.query(`
    SELECT cd.id_producto, p.nombre_producto, cd.cantidad, cd.precio_unitario,
            (cd.cantidad * cd.precio_unitario) AS subtotal
     FROM carritoDetalle cd
     JOIN producto p ON cd.id_producto = p.id_producto
     WHERE cd.id_carrito = ?`,
    [carrito.id_carrito]
  )

  const total = productos.reduce((acc, prod) => acc + Number(prod.subtotal), 0)

  return { productos, total }
}

module.exports = {
  getCarritoAbierto
};
