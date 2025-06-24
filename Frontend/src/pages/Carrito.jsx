import { useEffect, useState } from 'react';
import { getToken, getUserRole } from '../utils/auth';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const token = getToken();

  useEffect(() => {
    const rol = getUserRole();
    if (rol !== 'cliente') {
      navigate('/');
      return;
    }

    axios.get('/carrito', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setProductos(res.data.productos || []);
      setTotal(res.data.total || 0);
    })
    .catch(err => {
      console.error(err);
      setMensaje('No se pudo cargar el carrito.');
    });
  }, [navigate, token]);

  const finalizarCompra = async () => {
    try {
      const res = await axios.post('/ventas/procesar-carrito', {
        id_formaPago: 1
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMensaje(`Compra realizada. ID Venta: ${res.data.id_venta}`);
      setProductos([]);
      setTotal(0);
    } catch (err) {
      console.error(err);
      setMensaje('Error al procesar el carrito.');
    }
  };

  return (
    <div>
      <h2>Mi carrito</h2>
      {productos.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {productos.map((prod) => (
              <li key={prod.id_producto}>
                {prod.nombre_producto} x{prod.cantidad} - ${prod.subtotal}
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> ${total}</p>
          <button onClick={finalizarCompra}>Finalizar compra</button>
        </>
      )}
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Carrito;
