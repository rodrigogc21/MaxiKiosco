import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { getUserRole } from '../../utils/auth';
import { Navigate } from 'react-router-dom';

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    rol: 'cliente'
  });
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const rol = getUserRole();
  if (rol !== 'admin') return <Navigate to="/" />


    useEffect(() => {
    cargarUsuarios();
    }, []);

  const cargarUsuarios = () => {
    api.get('/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error('Error al cargar usuarios', err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await api.put(`/usuarios/${idEditando}`, formData);
      } else {
        await api.post('/usuarios/crear', formData);
      }
      cargarUsuarios();
      setFormData({ nombre: '', email: '', contraseña: '', rol: 'cliente' });
      setEditando(false);
      setIdEditando(null);
    } catch (err) {
      console.error('Error al guardar usuario', err);
    }
  };

  const handleEditar = (usuario) => {
    setFormData({
      nombre: usuario.nombre,
      email: usuario.email,
      contraseña: '',
      rol: usuario.rol
    });
    setEditando(true);
    setIdEditando(usuario.id_usuario);
  };

  const handleEliminar = async (id) => {
    if (confirm('¿Eliminar este usuario?')) {
      try {
        await api.delete(`/usuarios/${id}`);
        cargarUsuarios();
      } catch (err) {
        console.error('Error al eliminar usuario', err);
      }
    }
  };

  return (
    <div>
      <h2>{editando ? 'Editar usuario' : 'Nuevo usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
        <input name="contraseña" placeholder="Contraseña" type="password" value={formData.contraseña} onChange={handleChange} required={!editando} />
        <select name="rol" value={formData.rol} onChange={handleChange}>
          <option value="cliente">Cliente</option>
          <option value="empleado">Empleado</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">{editando ? 'Actualizar' : 'Crear'}</button>
      </form>

      <h3>Listado de usuarios</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id_usuario}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>
                <button onClick={() => handleEditar(u)}>Editar</button>
                <button onClick={() => handleEliminar(u.id_usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosAdmin;
