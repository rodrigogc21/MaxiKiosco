import React, { useEffect, useState } from 'react';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/usuarios", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      if (!res.ok) throw new Error('Error al obtener usuarios');
      return res.json();
    })
    .then(data => setUsuarios(data))
    .catch(err => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map(user => (
          <li key={user.id_usuario}>{user.nombre_usuario} {user.apellido_usuario}</li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
