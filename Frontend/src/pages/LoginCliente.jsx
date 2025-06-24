import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('/auth/login', {
        email,
        contraseña
      })

      const token = res.data.token
      localStorage.setItem('token', token)

      
      const payload = JSON.parse(atob(token.split('.')[1]));
      const rol = payload.rol

      
      if (rol === 'admin') navigate('/admin')
      else if (rol === 'empleado') navigate('/empleado')
      else navigate('/cliente')

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }


  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "2rem",
        maxWidth: "320px",
        margin: "4rem auto",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          fontSize: "1rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginTop: "1rem",
          boxSizing: "border-box",
        }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          fontSize: "1rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginTop: "1rem",
          boxSizing: "border-box",
        }}
      />
      {err && (
        <p style={{ color: "#dc3545", marginTop: "1rem", fontWeight: "600" }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem",
          width: "100%",
          backgroundColor: "#007bff",
          color: "#fff",
          fontWeight: "600",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Ingresar
      </button>
    </form>
  );
};

export default Login
