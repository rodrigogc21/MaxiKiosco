import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CrudProveedores = () => {
  const [proveedores, setProveedores] = useState([])
  const [form, setForm] = useState({
    razonSocial: '',
    cuit: '',
    correo_proveedor: '',
    direccion_proveedor: '',
    telefono_proveedor: ''
  })
  const [editando, setEditando] = useState(null)

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const fetchProveedores = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/proveedores', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProveedores(res.data)
    } catch (error) {
      console.error('Error al obtener proveedores:', error.response?.data || error.message)
    }
  }

  useEffect(() => {
    fetchProveedores()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editando) {
        await axios.put(`http://localhost:3001/api/proveedores/${editando}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post('http://localhost:3001/api/proveedores', form, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }

      setForm({
        razonSocial: '',
        cuit: '',
        correo_proveedor: '',
        direccion_proveedor: '',
        telefono_proveedor: ''
      })
      setEditando(null)
      fetchProveedores()
    } catch (error) {
      console.error('Error al guardar proveedor:', error.response?.data || error.message)
    }
  }

  const handleEdit = (prov) => {
    setForm({
      razonSocial: prov.razonSocial || '',
      cuit: prov.cuit || '',
      correo_proveedor: prov.correo_proveedor || '',
      direccion_proveedor: prov.direccion_proveedor || '',
      telefono_proveedor: prov.telefono_proveedor || ''
    })
    setEditando(prov.id_proveedor)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro que deseas eliminar este proveedor?')) return

    try {
      await axios.delete(`http://localhost:3001/api/proveedores/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchProveedores()
    } catch (error) {
      console.error('Error al eliminar proveedor:', error.response?.data || error.message)
    }
  }

  return (
    <div className="container mt-4">
        
      <div className="text-end mb-3">
        <button className="btn btn-secondary" onClick={() => navigate('/menu')}>
          ← Volver al Menú
        </button>
      </div>

      <h2 className="mb-4">Gestión de Proveedores</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="razonSocial"
            placeholder="Razón Social"
            value={form.razonSocial}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="cuit"
            placeholder="CUIT"
            value={form.cuit}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="email"
            className="form-control"
            name="correo_proveedor"
            placeholder="Correo electrónico"
            value={form.correo_proveedor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            name="direccion_proveedor"
            placeholder="Dirección"
            value={form.direccion_proveedor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            name="telefono_proveedor"
            placeholder="Teléfono"
            value={form.telefono_proveedor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            {editando ? 'Actualizar Proveedor' : 'Crear Proveedor'}
          </button>
          {editando && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setForm({
                  razonSocial: '',
                  cuit: '',
                  correo_proveedor: '',
                  direccion_proveedor: '',
                  telefono_proveedor: ''
                })
                setEditando(null)
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <table className="table table-striped">
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
          {proveedores.map((prov) => (
            <tr key={prov.id_proveedor}>
              <td>{prov.razonSocial}</td>
              <td>{prov.cuit}</td>
              <td>{prov.correo_proveedor}</td>
              <td>{prov.direccion_proveedor}</td>
              <td>{prov.telefono_proveedor}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(prov)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(prov.id_proveedor)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CrudProveedores
