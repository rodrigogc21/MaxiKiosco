import {useState, useEffect} from 'react'

const Carrito = () => {
  const [carrito, setCarrito] = useState([])
  const [total, setTotal] = useState(0)
  const [formaPago, setFormaPago] = useState(1)
  const [mensaje, setMensaje] = useState('')
  const [procesando, setProcesando] = useState(false)

  const usuario = JSON.parse(localStorage.getItem('usuario'))
  const idUsuario = usuario?.id_usuario

  useEffect(() => {
    if (!idUsuario) return

    fetch(`http://localhost:3001/api/carrito/${idUsuario}`, {
      headers: {
    'Authorization': `Bearer ${usuario?.token}`
    }})
    .then(res => res.json())
    .then(data => {

      if (!Array.isArray(data)) {
      throw new Error('Formato de respuesta inválido')
      }

      setCarrito(data)

      const total = data.reduce((acc, item) => acc + item.subtotal, 0)
      setTotal(total)
    })
    .catch(err => console.error('Error al cargar el carrito:', err))
  }, [idUsuario])

  const finalizarCompra = async () => {
    setProcesando(true)
    try {
      const res = await fetch('http://localhost:3001/api/ventas/procesar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usuario?.token}`
          },
        body: JSON.stringify({
          id_usuario: idUsuario,
          id_formaPago: formaPago
        })
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setMensaje(`Compra realizada con éxito. ID de venta: ${data.idVenta}`)
        setCarrito([])
        setTotal(0)
      } else {
        setMensaje(data.error || 'Error al finalizar la compra.')
      }
    } catch (error) {
      console.error('Error:', error)
      setMensaje('Error en la conexión.')
    } finally {
      setProcesando(false)
    }
  }

  return (
    <div className="container py-4">
      <h2>Mi carrito</h2>
      {!idUsuario ? (
        <p>Debes iniciar sesión para ver el carrito</p>
      ) : carrito.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Productos</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre_producto}</td>
                <td>{item.precio_unitario}</td>
                <td>{item.cantidad}</td>
                <td>${item.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong>Total: ${total.toFixed(2)}</strong>
          <select
          className="form-select w-auto"
          value={formaPago}
          onChange={(e) => setFormaPago(Number(e.target.value))}
          >
            <option value={1}>Efectivo</option>
            <option value={2}>Tarjeta</option>
            <option value={3}>Mercado Pago</option>
          </select>
        </div>

        <button className="btn btn-success" onClick={finalizarCompra} disabled={procesando}>
          {procesando ? 'Procesando...' : 'Finalizar Compra'}
        </button>
        </>
      )}

      {mensaje && (
        <div className="alert alert-info mt-3">
          {mensaje}
        </div>
      )}
    </div>
  )
}

export default Carrito