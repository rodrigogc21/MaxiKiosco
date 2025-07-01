import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const RutaProtegida = ({ allowedRoles, children }) => {
  const { usuario } = useUser();

  if (!usuario) return <Navigate to="/login" />
  if (!allowedRoles.includes(usuario.rol)) return <Navigate to="/menu" />;

  return children;
};

export default RutaProtegida;
