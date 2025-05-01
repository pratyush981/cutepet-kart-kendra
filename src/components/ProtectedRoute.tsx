
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  
  // Show enhanced loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-petshop-purple" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
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
