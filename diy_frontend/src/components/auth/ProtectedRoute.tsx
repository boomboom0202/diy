import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVerification?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireVerification = false 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Сохраняем путь, на который пользователь пытался попасть
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Проверка верификации email если требуется
  if (requireVerification && user && !user.is_verified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
};