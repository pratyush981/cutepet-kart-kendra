
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-petshop-purple"></div>
      </div>
    );
  }

  // Check authentication
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  // Check admin rights if required
  if (adminOnly && !isAdmin()) {
    return <Navigate to="/" replace />;
  }
  
  // Render children if all checks pass
  return <>{children}</>;
};

export default ProtectedRoute;
