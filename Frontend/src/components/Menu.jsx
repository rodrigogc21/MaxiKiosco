import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

const Menu = () => {
  const { usuario, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = [];

  if (usuario?.rol === 'admin' || usuario?.rol === 'empleado') {
    links.push({ to: '/usuarios', label: 'Usuarios' });
    links.push({ to: '/productos', label: 'Productos' });
  }

  if (usuario?.rol === 'admin') {
    links.push({ to: '/categorias', label: 'Categorías' });
    links.push({ to: '/proveedores', label: 'Proveedores' });
  }

  return (
    <div
      className="vh-100 d-flex flex-column"
      style={{
        background: 'linear-gradient(135deg, #fceabb, #f8b500)',
        color: '#333'
      }}
    >
      <div className="d-flex justify-content-end p-3 bg-transparent">
        {usuario && (
          <>
            <span className="me-3 fw-bold">
              Rol: <strong>{usuario.rol}</strong>
            </span>
            <button className="btn btn-dark btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="mb-5 fw-bold display-4 text-dark">MaxiKiosco (Gestión)</h1>

        <div className="d-flex flex-column gap-4">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="btn btn-dark btn-lg shadow"
              style={{ minWidth: '220px' }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
