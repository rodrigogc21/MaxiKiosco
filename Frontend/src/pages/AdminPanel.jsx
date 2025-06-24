import { getUserRole } from '../utils/auth';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {

  const rol = getUserRole()

  if (rol !== 'admin') return <Navigate to="/" />
  return <div>Panel de administración</div>
};

export default AdminPanel