import { useEffect, useState } from 'react';
import api from '../api/axios'
import { getUserRole } from '../../utils/auth';
import { Navigate } from 'react-router-dom';

const ProductosAdmin = () => {

  const [productos, setProductos] = useState([])

  const [formData, setFormData] = useState({
    nombre_producto: '',
    precio_producto: '',
    stock: '',
    imagen_url: '',
    id_categoria: '',
    id_proveedor: ''
  })

  const [editando, setEditando] = useState(false)
  const [idEditando, setIdEditando] = useState(null)

  const rol = getUserRole()
  if (!['admin', 'empleado'].includes(rol)) return <Navigate to="/" />

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    api.get('/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await api.put(`/productos/${idEditando}`, formData);
      } else {
        await api.post('/productos', formData);
      }
      cargarProductos();
      setFormData({ nombre_producto: '', precio_producto: '', stock: '', imagen_url: '', id_categoria: '', id_proveedor: '' });
      setEditando(false);
      setIdEditando(null);
    } catch (error) {
      console.error('Error al guardar producto', error);
    }
  };

  const handleEditar = (producto) => {
    setFormData(producto);
    setEditando(true);
    setIdEditando(producto.id_producto);
  };

  const handleEliminar = async (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await api.delete(`/productos/${id}`);
        cargarProductos();
      } catch (error) {
        console.error('Error al eliminar', error);
      }
    }
  };

  return (
    <div>
      <h2>{editando ? 'Editar producto' : 'Nuevo producto'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre_producto" placeholder="Nombre" value={formData.nombre_producto} onChange={handleChange} />
        <input name="precio_producto" placeholder="Precio" type="number" value={formData.precio_producto} onChange={handleChange} />
        <input name="stock" placeholder="Stock" type="number" value={formData.stock} onChange={handleChange} />
        <input name="imagen_url" placeholder="Imagen URL" value={formData.imagen_url} onChange={handleChange} />
        <input name="id_categoria" placeholder="ID Categoría" value={formData.id_categoria} onChange={handleChange} />
        <input name="id_proveedor" placeholder="ID Proveedor" value={formData.id_proveedor} onChange={handleChange} />
        <button type="submit">{editando ? 'Actualizar' : 'Crear'}</button>
      </form>

      <h3>Listado de productos</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id_producto}>
              <td>{prod.nombre_producto}</td>
              <td>${prod.precio_producto}</td>
              <td>{prod.stock}</td>
              <td>{prod.id_categoria}</td>
              <td>{prod.id_proveedor}</td>
              <td>
                <button onClick={() => handleEditar(prod)}>Editar</button>
                <button onClick={() => handleEliminar(prod.id_producto)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductosAdmin;



