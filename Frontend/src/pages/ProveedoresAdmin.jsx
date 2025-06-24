import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { getUserRole } from '../../utils/auth';
import { Navigate } from 'react-router-dom';

const ProveedoresAdmin = () => {
  const [proveedores, setProveedores] = useState([]);
  const [formData, setFormData] = useState({
    razonSocial: '',
    cuit: '',
    correo_proveedor: '',
    direccion_proveedor: '',
    telefono_proveedor: ''
  });
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const rol = getUserRole();
  if (rol !== 'admin') return <Navigate to="/" />

  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = () => {
    api.get('/proveedores')
      .then(res => setProveedores(res.data))
      .catch(err => console.error('Error al cargar proveedores', err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await api.put(`/proveedores/${idEditando}`, formData);
      } else {
        await api.post('/proveedores', formData);
      }
      cargarProveedores();
      setFormData({
        razonSocial: '',
        cuit: '',
        correo_proveedor: '',
        direccion_proveedor: '',
        telefono_proveedor: ''
      });
      setEditando(false);
      setIdEditando(null);
    } catch (err) {
      console.error('Error al guardar proveedor', err);
    }
  };

  const handleEditar = (prov) => {
    setFormData(prov);
    setEditando(true);
    setIdEditando(prov.id_proveedor);
  };

  const handleEliminar = async (id) => {
    if (confirm('¿Eliminar este proveedor?')) {
      try {
        await api.delete(`/proveedores/${id}`);
        cargarProveedores();
      } catch (err) {
        console.error('Error al eliminar proveedor', err);
      }
    }
  };

  return (
    <div>
      <h2>{editando ? 'Editar proveedor' : 'Nuevo proveedor'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="razonSocial" placeholder="Razón Social" value={formData.razonSocial} onChange={handleChange} required />
        <input name="cuit" placeholder="CUIT" value={formData.cuit} onChange={handleChange} required />
        <input name="correo_proveedor" placeholder="Correo" value={formData.correo_proveedor} onChange={handleChange} />
        <input name="direccion_proveedor" placeholder="Dirección" value={formData.direccion_proveedor} onChange={handleChange} />
        <input name="telefono_proveedor" placeholder="Teléfono" value={formData.telefono_proveedor} onChange={handleChange} />
        <button type="submit">{editando ? 'Actualizar' : 'Crear'}</button>
      </form>

      <h3>Listado de proveedores</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Razón Social</th>
            <th>CUIT</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map(p => (
            <tr key={p.id_proveedor}>
              <td>{p.razonSocial}</td>
              <td>{p.cuit}</td>
              <td>{p.correo_proveedor}</td>
              <td>{p.direccion_proveedor}</td>
              <td>{p.telefono_proveedor}</td>
              <td>
                <button onClick={() => handleEditar(p)}>Editar</button>
                <button onClick={() => handleEliminar(p.id_proveedor)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProveedoresAdmin;
