import { useEffect, useState } from 'react';
import { useUser } from '../context/userContext';

const Carrito = () => {
  const { usuario } = useUser();
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [formaPago, setFormaPago] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const [procesando, setProcesando] = useState(false);

  const idUsuario = usuario?.id_usuario;

  useEffect(() => {
    if (!idUsuario) return;

    fetch(`http://localhost:3001/api/carrito/${idUsuario}`, {
      headers: {
        Authorization: `Bearer ${usuario.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Formato inválido');

        setCarrito(data);
        const total = data.reduce((acc, item) => acc + Number(item.subtotal), 0);
        setTotal(total);
      })
      .catch((err) => console.error('Error al cargar el carrito:', err));
  }, [idUsuario]);

  const finalizarCompra = async () => {
    setProcesando(true);
    try {
      const res = await fetch('http://localhost:3001/api/ventas/procesar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify({
          id_usuario: idUsuario,
          id_formaPago: formaPago,
        }),
      });

      const data = await res.json();
      if (res.ok && data.idVenta) {
        setMensaje(`✅ Compra realizada. ID venta: ${data.idVenta}`);
        setCarrito([]);
        setTotal(0);
      } else {
        console.error('Error en el backend', data.error)
        setMensaje(data.error || '❌ Error al finalizar la compra.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('❌ Error en la conexión.');
    } finally {
      setProcesando(false);
    }
  };

  const vaciarCarrito = async () => {
    if (!window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) return;

    try {
      const res = await fetch(`http://localhost:3001/api/carrito/vaciar/${idUsuario}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${usuario.token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje('🗑️ Carrito vaciado.');
        setCarrito([]);
        setTotal(0);
      } else {
        setMensaje(data.error || '❌ No se pudo vaciar el carrito.');
      }
    } catch (error) {
      console.error('Error al vaciar carrito:', error);
      setMensaje('❌ Error en la conexión.');
    }
  };

  return (
    <div className="container py-4">
      <h2>Mi carrito</h2>
      {!idUsuario ? (
        <p>🔒 Debes iniciar sesión para ver el carrito</p>
      ) : carrito.length === 0 ? (
        <p>🛒 El carrito está vacío</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre_producto}</td>
                  <td>${item.precio_unitario}</td>
                  <td>{item.cantidad}</td>
                  <td>${Number(item.subtotal).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <strong>Total: ${Number(total).toFixed(2)}</strong>
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

          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={finalizarCompra} disabled={procesando}>
              {procesando ? 'Procesando...' : 'Finalizar Compra'}
            </button>
            <button className="btn btn-outline-danger" onClick={vaciarCarrito}>
              Vaciar Carrito
            </button>
          </div>
        </>
      )}

      {mensaje && (
        <div className="alert alert-info mt-3" role="alert">
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default Carrito;
