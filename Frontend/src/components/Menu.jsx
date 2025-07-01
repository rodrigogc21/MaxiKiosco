// components/Menu.js
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Menu = () => {
  const { usuario } = useUser();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">MaxiKiosco</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#menuPrincipal"
        aria-controls="menuPrincipal"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="menuPrincipal">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          {(usuario?.rol === 'admin' || usuario?.rol === 'empleado') && (
            <>
            <li className="nav-item">
              <Link className="nav-link" to="/usuarios">Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            </>
          )}

          {usuario?.rol === 'admin' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/categorias">Categorías</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/proveedores">Proveedores</Link>
              </li>
            </>
          )}
        </ul>

        {usuario && (
          <span className="navbar-text text-dark">
            Rol: <strong>{usuario.rol}</strong>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Menu;
