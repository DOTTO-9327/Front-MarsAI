import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  // Attendre que le contexte ait fini de lire le localStorage
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mars-light">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  // Si non connecté, retour à la page de login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Si le rôle de l'utilisateur n'est pas dans la liste des rôles autorisés pour cette route
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/admin" replace />; 
  }

  return children;
};

export default ProtectedRoute;