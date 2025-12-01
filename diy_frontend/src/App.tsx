import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Home } from './pages/Home';
import { Dashboard } from './pages/user/Dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Защищенные маршруты */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Временные заглушки для других страниц */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="p-8">Страница профиля (в разработке)</div>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <div className="p-8">Мои бронирования (в разработке)</div>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/instructors"
            element={
              <ProtectedRoute>
                <div className="p-8">Инструкторы (в разработке)</div>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/skills"
            element={
              <ProtectedRoute>
                <div className="p-8">Навыки (в разработке)</div>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <div className="p-8">Сообщения (в разработке)</div>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <div className="p-8">Настройки (в разработке)</div>
              </ProtectedRoute>
            }
          />
          
          {/* Редирект на главную для несуществующих маршрутов */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;