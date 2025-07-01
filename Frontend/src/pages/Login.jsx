import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext'

const Login = () => {
  const [correo_usuario, setCorreoUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { usuario, setUsuario } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo_usuario, contraseña }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      const data = await res.json()
      console.log('Usuario recibido: ', data)
      console.log('Token recibido:', data.token)
      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data))
      setUsuario(data)

    } catch (err) {
      console.error(err);
      setError(err.message);
    }

  }

  useEffect(() => {

    if (!usuario) return;

        if (usuario.rol === 'cliente') {
         navigate('/');
      } else if (usuario.rol === 'admin' || usuario.rol === 'empleado') {
         navigate('/menu');
      }
      }, [usuario, navigate])

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="border p-4 shadow rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={correo_usuario}
            onChange={(e) => setCorreoUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  );
}

export default Login
