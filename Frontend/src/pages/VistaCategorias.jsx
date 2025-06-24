import { useEffect, useState } from 'react';
import api from '../api/axios';

const VistaCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [mensaje, setMensaje] = useState('');

  const cargarCategorias = () => {
    api.get('/categorias')
      .then(res => {
        setCategorias(res.data);
        setMensaje('');
      })
      .catch(() => {
        setMensaje('Error al cargar categorías');
      });
  };

  const buscarCategoria = () => {
    if (!busqueda) return cargarCategorias();

    api.get(`/categorias/${busqueda}`)
      .then(res => {
        setCategorias(Array.isArray(res.data) ? res.data : [res.data]);
        setMensaje('');
      })
      .catch(() => {
        setCategorias([]);
        setMensaje('Categoría no encontrada');
      });
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <div>
      <h2>Categorías</h2>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button onClick={buscarCategoria}>Buscar</button>
      {mensaje && <p>{mensaje}</p>}
      <ul>
        {categorias.map(cat => (
          <li key={cat.id_categoria}>{cat.nombre_categoria}</li>
        ))}
      </ul>
    </div>
  );
};

export default VistaCategorias;
