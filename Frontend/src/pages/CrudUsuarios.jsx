import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CrudUsuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [form, setForm] = useState({
    nombre_usuario: '',
    apellido_usuario: '',
    correo_usuario: '',
    contraseña: '',
    direccion_usuario: '',
    telefono_usuario: '',
    rol: 'cliente'
  })
  const [editando, setEditando] = useState(null)

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/usuarios', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsuarios(res.data)
    } catch (error) {
      console.error('Error al obtener usuarios:', error.response?.data || error.message)
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    if (editando) {
      const { rol, ...formSinRol } = form
      await axios.put(`http://localhost:3001/api/usuarios/${editando}`, formSinRol, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } else {
      await axios.post('http://localhost:3001/api/usuarios/crear', form, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }

    setForm({
      nombre_usuario: '',
      apellido_usuario: '',
      correo_usuario: '',
      contraseña: '',
      direccion_usuario: '',
      telefono_usuario: '',
      rol: 'cliente'
    })
    setEditando(null)
    fetchUsuarios()
  } catch (error) {
    console.error('Error al guardar usuario:', error.response?.data || error.message)
  }
}


  const handleEdit = (usuario) => {
    console.log('Usuario al editar:', usuario)
    setForm({
      nombre_usuario: usuario.nombre_usuario || '',
      apellido_usuario: usuario.apellido_usuario || '',
      correo_usuario: usuario.correo_usuario || '',
      contraseña: usuario.contraseña || '',
      direccion_usuario: usuario.direccion_usuario || '',
      telefono_usuario: usuario.telefono_usuario || '',
      rol: usuario.rol || 'cliente'
    })
    setEditando(usuario.id_usuario)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro que deseas eliminar este usuario?')) return

    try {
      await axios.delete(`http://localhost:3001/api/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchUsuarios()
    } catch (error) {
      console.error('Error al eliminar usuario:', error.response?.data || error.message)
    }
  }

  return (
    <div className="container mt-4">
        <div className="text-end mb-3">
         <button
          className="btn btn-secondary mb-3"
          onClick={() => navigate('/menu')}
         >
           ← Volver al Menú
         </button>
        </div>
      <h2 className="mb-4">Gestión de Usuarios</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-6">
          <input type="text" className="form-control" name="nombre_usuario" placeholder="Nombre" value={form.nombre_usuario} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="apellido_usuario" placeholder="Apellido" value={form.apellido_usuario} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input type="email" className="form-control" name="correo_usuario" placeholder="Correo" value={form.correo_usuario} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input type="password" className="form-control" name="contraseña" placeholder="Contraseña" value={form.contraseña} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="direccion_usuario" placeholder="Dirección" value={form.direccion_usuario} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" name="telefono_usuario" placeholder="Teléfono" value={form.telefono_usuario} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <select className="form-select" name="rol" value={form.rol} onChange={handleChange} required>
            <option value="cliente">Cliente</option>
            <option value="empleado">Empleado</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            {editando ? 'Actualizar Usuario' : 'Crear Usuario'}
          </button>
          {editando && (
            <button type="button" className="btn btn-secondary ms-2" onClick={() => {
              setForm({
                nombre_usuario: '',
                apellido_usuario: '',
                correo_usuario: '',
                contraseña: '',
                direccion_usuario: '',
                telefono_usuario: '',
                rol: 'cliente'
              })
              setEditando(null)
            }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id_usuario}>
              <td>{u.nombre_usuario}</td>
              <td>{u.apellido_usuario}</td>
              <td>{u.correo_usuario}</td>
              <td>{u.telefono_usuario}</td>
              <td>{u.rol}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(u)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id_usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CrudUsuarios
