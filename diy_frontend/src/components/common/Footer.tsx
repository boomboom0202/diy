import { Link } from 'react-router-dom';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-semibold text-slate-800">
          DIY Platform · {year}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className="transition hover:text-indigo-700 hover:underline"
          >
            О проекте
          </Link>
          <Link
            to="/"
            className="transition hover:text-indigo-700 hover:underline"
          >
            Поддержка
          </Link>
          <Link
            to="/"
            className="transition hover:text-indigo-700 hover:underline"
          >
            Контакты
          </Link>
        </div>
      </div>
    </footer>
  );
};

