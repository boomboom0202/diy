import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Личный кабинет</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Информация о пользователе
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            {user?.first_name && (
              <p className="text-gray-600">
                <span className="font-medium">Имя:</span> {user.first_name}
              </p>
            )}
            {user?.last_name && (
              <p className="text-gray-600">
                <span className="font-medium">Фамилия:</span> {user.last_name}
              </p>
            )}
            <p className="text-gray-600">
              <span className="font-medium">Статус верификации:</span>{' '}
              {user?.is_verified ? (
                <span className="text-green-600">✓ Подтвержден</span>
              ) : (
                <span className="text-yellow-600">⚠ Не подтвержден</span>
              )}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/profile"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-indigo-600 text-3xl mb-3">👤</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Профиль
            </h3>
            <p className="text-gray-600 text-sm">
              Управление личными данными
            </p>
          </Link>

          <Link
            to="/bookings"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-indigo-600 text-3xl mb-3">📅</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Мои бронирования
            </h3>
            <p className="text-gray-600 text-sm">
              Просмотр и управление занятиями
            </p>
          </Link>

          <Link
            to="/instructors"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-indigo-600 text-3xl mb-3">👨‍🏫</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Инструкторы
            </h3>
            <p className="text-gray-600 text-sm">
              Найти инструктора
            </p>
          </Link>

          <Link
            to="/skills"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-indigo-600 text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Навыки
            </h3>
            <p className="text-gray-600 text-sm">
              Обзор доступных навыков
            </p>
          </Link>

          <Link
            to="/messages"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-indigo-600 text-3xl mb-3">💬</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Сообщения
            </h3>
            <p className="text-gray-600 text-sm">
              Общение с инструкторами
            </p>
          </Link>

          <Link
            to="/settings"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-indigo-600 text-3xl mb-3">⚙️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Настройки
            </h3>
            <p className="text-gray-600 text-sm">
              Настройки аккаунта
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};