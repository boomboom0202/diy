import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { to: '/', label: 'Главная', requiresAuth: false },
  { to: '/skills', label: 'Навыки', requiresAuth: false },
  { to: '/instructors', label: 'Инструкторы', requiresAuth: false },
  { to: '/bookings', label: 'Бронирования', requiresAuth: true },
  { to: '/dashboard', label: 'Кабинет', requiresAuth: true },
];

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  const visibleNav = navItems.filter(
    (item) => !item.requiresAuth || isAuthenticated,
  );

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3 text-slate-900">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-sm">
            DIY
          </span>
          <div className="leading-tight">
            <div className="text-base font-bold">DIY Platform</div>
            <div className="text-xs text-slate-500">
              Учись. Делись. Создавай.
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {visibleNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-slate-600 sm:block">
                Привет, {user?.first_name || user?.email}
              </span>
              <Link
                to="/dashboard"
                className="hidden rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:inline-flex"
              >
                Кабинет
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
              >
                Войти
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

