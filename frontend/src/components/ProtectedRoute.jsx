import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoute (props) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return props.children;
}

export default ProtectedRoute;
