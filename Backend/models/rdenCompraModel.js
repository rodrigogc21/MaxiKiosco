const db = Require('../config/db')

const crearOrdenCompra = async ({ id_proveedor, id_usuario, productos }) => {

  const total = productos.reduce((acc, prod) => acc + prod.subtotal, 0)


   await db.query('CALL crear_ordenCompra(?, ?, ?, @id_orden)', [
    id_proveedor,
    id_usuario,
    total
  ])

  const [[{ id_orden }]] = await db.query('SELECT @id_orden AS id_orden')

  for (const producto of productos) {
    await db.query('INSERT INTO detalleOrdenCompra (id_ordenCompra, id_producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
      [id_orden, producto.id_producto, producto.cantidad, producto.precio_unitario, producto.subtotal]
    )
  }

  return id_orden
}

const getOrdenes = async () => {
  const [rows] = await db.query(`
    SELECT oc.id_ordenCompra, oc.fecha, oc.total,
           p.razonSocial AS proveedor, u.nombre_usuario AS usuario
    FROM ordenCompra oc
    JOIN proveedor p ON oc.id_proveedor = p.id_proveedor
    JOIN usuario u ON oc.id_usuario = u.id_usuario
    ORDER BY oc.fecha DESC
  `)
  return rows
}

const getOrdenDetalleById = async (id_orden) => {
  const [[orden]] = await db.query(`
    SELECT oc.*, p.razonSocial AS proveedor, u.nombre_usuario AS usuario
    FROM ordenCompra oc
    JOIN proveedor p ON oc.id_proveedor = p.id_proveedor
    JOIN usuario u ON oc.id_usuario = u.id_usuario
    WHERE oc.id_ordenCompra = ?`, [id_orden])

  const [productos] = await db.query(`
    SELECT doc.id_producto, pr.nombre_producto, doc.cantidad, doc.precio_unitario, doc.subtotal
    FROM detalleOrdenCompra doc
    JOIN producto pr ON doc.id_producto = pr.id_producto
    WHERE doc.id_ordenCompra = ?`, [id_orden])

  return {...orden, productos}
}

const eliminarOrdenCompra = async (id_ordenCompra) => {
  await db.query('DELETE FROM detalleOrdenCompra WHERE id_ordenCompra = ?', [id_ordenCompra])
  await db.query('DELETE FROM ordenCompra WHERE id_ordenCompra = ?', [id_ordenCompra])
}

module.exports = {
  crearOrdenCompra,
  getOrdenes,
  getOrdenDetalleById,
  eliminarOrdenCompra
}
