import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            DIY Platform
          </h1>
          <p className="text-xl text-gray-600">
            Платформа для обучения и обмена навыками
          </p>
        </div>

        {/* User Status */}
        {isAuthenticated ? (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Добро пожаловать, {user?.first_name || user?.email}! 👋
              </h2>
              <div className="flex justify-center gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Личный кабинет
                </Link>
                <Link
                  to="/skills"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Навыки
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Начните прямо сейчас
              </h2>
              <p className="text-gray-600 mb-6">
                Присоединяйтесь к нашему сообществу и начните учиться новому
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Регистрация
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Вход
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-indigo-600 text-3xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Обучение
            </h3>
            <p className="text-gray-600">
              Найдите опытных инструкторов и освойте новые навыки
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-indigo-600 text-3xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Сообщество
            </h3>
            <p className="text-gray-600">
              Общайтесь с единомышленниками и делитесь опытом
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-indigo-600 text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Гибкость
            </h3>
            <p className="text-gray-600">
              Учитесь в удобное время и в удобном темпе
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};