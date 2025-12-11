import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const features = [
  {
    icon: '🎯',
    title: 'Навыки под цели',
    text: 'Подбор наставников и курсов под ваш уровень и расписание.',
  },
  {
    icon: '🧭',
    title: 'Прозрачный прогресс',
    text: 'Отслеживайте пройденные шаги, брони и обратную связь.',
  },
  {
    icon: '🤝',
    title: 'Сообщество',
    text: 'Общайтесь в чате, собирайте отзывы и делитесь результатами.',
  },
];

const steps = [
  { title: 'Зарегистрируйтесь', text: 'Создайте профиль и укажите интересующие направления.' },
  { title: 'Выберите наставника', text: 'Смотрите карточки инструкторов, отзывы и свободные слоты.' },
  { title: 'Бронируйте и учитесь', text: 'Закрепляйте навыки через задачи и живые сессии.' },
];

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <div className="absolute left-1/2 top-[-10%] h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-200 blur-3xl opacity-40" />
      <div className="absolute right-[5%] top-[20%] h-72 w-72 rounded-full bg-sky-200 blur-3xl opacity-40" />

      <div className="relative page-shell pb-16 pt-12 lg:pt-16">
        {/* Hero */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
              Новая платформа DIY
            </div>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Учитесь, бронируйте и прокачивайтесь с лучшими наставниками
            </h1>
            <p className="text-lg text-slate-600 sm:text-xl">
              Мы объединяем учеников и инструкторов: быстрые бронирования, прозрачная
              обратная связь и понятный прогресс в одном месте.
            </p>

            {isAuthenticated ? (
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/dashboard"
                  className="btn-primary"
                >
                  Перейти в кабинет
                </Link>
                <Link
                  to="/skills"
                  className="btn-secondary"
                >
                  Смотреть навыки
                </Link>
                <div className="text-sm text-slate-500">
                  Привет, {user?.first_name || user?.email} 👋
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Начать бесплатно
                </Link>
                <Link
                  to="/login"
                  className="btn-secondary"
                >
                  Войти
                </Link>
                <div className="text-sm text-slate-500">
                  Уже с нами тысячи уроков и отзывов.
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="card px-4 py-3 shadow-sm">
                <div className="text-xl font-semibold text-slate-900">5 000+</div>
                <div>успешных бронирований</div>
              </div>
              <div className="card px-4 py-3 shadow-sm">
                <div className="text-xl font-semibold text-slate-900">320</div>
                <div>проверенных инструкторов</div>
              </div>
              <div className="card px-4 py-3 shadow-sm">
                <div className="text-xl font-semibold text-slate-900">4.9/5</div>
                <div>средний рейтинг</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl bg-white/80 p-6 shadow-xl shadow-indigo-100 backdrop-blur">
              <div className="grid gap-4">
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
                  <div className="text-sm font-semibold text-indigo-700">Ближайшие занятия</div>
                  <div className="mt-2 text-lg font-bold text-slate-900">UI/UX для новичков</div>
                  <div className="text-sm text-slate-600">Завтра · 19:00 · 1.5 часа</div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <div className="text-sm font-semibold text-slate-700">Ваша цель недели</div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Завершить 2 практики и получить отзыв наставника
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-2/3 rounded-full bg-indigo-500" />
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                    Сообщения
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">
                      3 новых
                    </span>
                  </div>
                  <div className="mt-2 space-y-2 text-sm text-slate-600">
                    <div>Анна (UX): отправила чек-лист для ревью</div>
                    <div>Илья (Frontend): предложил слот Пт, 18:00</div>
                    <div>Кирилл (Motion): оставил отзыв о прогрессе</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="card group transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="mt-16 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-sm font-semibold text-indigo-700">Как это работает</div>
              <h2 className="text-2xl font-bold text-slate-900">3 шага до первых результатов</h2>
            </div>
            <Link
              to="/register"
              className="btn-primary px-4 py-2"
            >
              Попробовать сейчас
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-indigo-700">
                  Шаг {index + 1}
                  <span className="h-px flex-1 bg-indigo-100" />
                </div>
                <div className="mt-2 text-base font-semibold text-slate-900">{step.title}</div>
                <p className="mt-1 text-sm text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};