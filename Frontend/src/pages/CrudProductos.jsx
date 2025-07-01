import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/userContext';
import { Navigate } from 'react-router-dom';

const Productos = () => {
  const { usuario } = useUser();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [form, setForm] = useState({
    nombre_producto: '',
    descripcion_producto: '',
    precio_producto: '',
    stock: '',
    imagen_url: '',
    id_categoria: '',
    id_proveedor: ''
  });
  const [editando, setEditando] = useState(null);

  const fetchProductos = async () => {
    const res = await axios.get('http://localhost:3001/api/productos');
    setProductos(res.data);
  };

  const fetchCategorias = async () => {
    const res = await axios.get('http://localhost:3001/api/categorias');
    setCategorias(res.data);
  };

  const fetchProveedores = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.error('No hay token guardado')
        return
    }
    try {
          const res = await axios.get('http://localhost:3001/api/proveedores', {
           headers: {
            Authorization: `Bearer ${token}`,
           }
          })

          setProveedores(res.data)

    } catch (error) {
         console.error('Error al obtener proveedores:', error.response?.data || error.message)
    }
    }

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
    fetchProveedores();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token no encontrado en localStorage');
    return;
  }

    if (editando) {
      console.log('Enviando PUT con:', form);
      await axios.put(`http://localhost:3001/api/modificar-producto/${editando}`, { 
       ...form,
       precio_producto: parseFloat(form.precio_producto),
       stock: parseInt(form.stock),
       id_categoria: parseInt(form.id_categoria),
       id_proveedor: parseInt(form.id_proveedor),
      }, {
      headers: {
      Authorization: `Bearer ${token}`,
      }})
    } else {
      await axios.post('http://localhost:3001/api/modificar-producto', form, {
      headers: {
      Authorization: `Bearer ${token}`,
      }})
    }

    setForm({
      nombre_producto: '',
      descripcion_producto: '',
      precio_producto: '',
      stock: '',
      imagen_url: '',
      id_categoria: '',
      id_proveedor: ''
    });
    setEditando(null);
    fetchProductos();
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditando(p.id_producto);
  };

  const handleDelete = async (id) => {

    const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token no encontrado en localStorage');
    return;
  }

    if (confirm('¿Eliminar producto?')) {
      await axios.delete(`http://localhost:3001/api/modificar-producto/${id}`, {
      headers: {
      Authorization: `Bearer ${token}`,
      }})

      fetchProductos();
    }
  };

  if (!usuario || (usuario.rol !== 'admin' && usuario.rol !== 'empleado')) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-4">
      <h2>Gestión de Productos</h2>

      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <input
            type="text"
            name="nombre_producto"
            className="form-control"
            placeholder="Nombre"
            value={form.nombre_producto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-8">
          <input
            type="text"
            name="descripcion_producto"
            className="form-control"
            placeholder="Descripción"
            value={form.descripcion_producto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            name="precio_producto"
            className="form-control"
            placeholder="Precio"
            value={form.precio_producto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            name="stock"
            className="form-control"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="imagen_url"
            className="form-control"
            placeholder="URL de imagen"
            value={form.imagen_url}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <select
            name="id_categoria"
            className="form-select"
            value={form.id_categoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Categoría</option>
            {categorias.map((c) => (
              <option key={c.id_categoria} value={c.id_categoria}>
                {c.nombre_categoria}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            name="id_proveedor"
            className="form-select"
            value={form.id_proveedor}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Proveedor</option>
            {Array.isArray(proveedores) && proveedores.map(p => (
            <option key={p.id_proveedor} value={p.id_proveedor}>
              {p.razonSocial}
            </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-success w-100">
            {editando ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Categoría</th>
            <th>Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id_producto}>
              <td>{p.id_producto}</td>
              <td>{p.nombre_producto}</td>
              <td>{p.descripcion_producto}</td>
              <td>${p.precio_producto}</td>
              <td>{p.stock}</td>
              <td>
                {p.imagen_url && (
                  <img src={p.imagen_url} alt="img" width={50} />
                )}
              </td>
              <td>{p.nombre_categoria || p.id_categoria}</td>
              <td>{p.nombre_proveedor || p.id_proveedor}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEdit(p)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(p.id_producto)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;
