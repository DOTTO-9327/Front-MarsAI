import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();

  // Si l'utilisateur n'est pas connecté, redirection vers le login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Si connecté, on affiche les routes enfants via l'Outlet
  return <Outlet />;
};

export default ProtectedRoute;