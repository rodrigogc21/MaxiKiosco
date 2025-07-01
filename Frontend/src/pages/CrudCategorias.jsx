import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CrudCategorias = () => {
  const [categorias, setCategorias] = useState([])
  const [form, setForm] = useState({
    nombre_categoria: '',
    descripcion: ''
  })
  const [editando, setEditando] = useState(null)

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const fetchCategorias = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/categorias', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCategorias(res.data)
    } catch (error) {
      console.error('Error al obtener categorías:', error.response?.data || error.message)
    }
  }

  useEffect(() => {
    fetchCategorias()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editando) {
        console.log("Form a enviar:", form)
        await axios.put(`http://localhost:3001/api/modificar-categorias/${editando}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        const res = await axios.post('http://localhost:3001/api/modificar-categorias/crear', form, {
          headers: { Authorization: `Bearer ${token}` }
        })
        console.log('Categoría guardada: ', res.data)
      }

      setForm({ nombre_categoria: '', descripcion: '' })
      setEditando(null)
      fetchCategorias()
    } catch (error) {
      console.error('Error al guardar categoría:', error.response?.data || error.message)
    }
  }

  const handleEdit = (cat) => {
    setForm({
      nombre_categoria: cat.nombre_categoria || '',
      descripcion: cat.descripcion || ''
    })
    setEditando(cat.id_categoria)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro que deseas eliminar esta categoría?')) return

    try {
        console.log('ID a eliminar: ', id)
      await axios.delete(`http://localhost:3001/api/modificar-categorias/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchCategorias()
    } catch (error) {
      console.error('Error al eliminar categoría:', error.response?.data || error.message)
    }
  }

  return (
    <div className="container mt-4">
      <div className="text-end mb-3">
        <button className="btn btn-secondary" onClick={() => navigate('/menu')}>
          ← Volver al Menú
        </button>
      </div>

      <h2 className="mb-4">Gestión de Categorías</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="nombre_categoria"
            placeholder="Nombre de categoría"
            value={form.nombre_categoria || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion || ''}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            {editando ? 'Actualizar Categoría' : 'Crear Categoría'}
          </button>
          {editando && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setForm({ nombre_categoria: '', descripcion: '' })
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
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <tr key={cat.id_categoria}>
              <td>{cat.nombre_categoria}</td>
              <td>{cat.descripcion}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(cat)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(cat.id_categoria)}
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

export default CrudCategorias
