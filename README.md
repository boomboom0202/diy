# Backend README

## Установка и запуск

### 1. Создать виртуальное окружение
```bash
python -m venv env
source env/bin/activate  # Linux / macOS
env\Scripts\activate   # Windows
```

### 2. Установить зависимости
```bash
pip install -r requirements/base.txt
```

### 3. Настроить переменные окружения
1. Переименовать файл:
```bash
mv .env.example .env
```
2. Указать свои настройки внутри `.env`.

### 4. Структура проекта
Структура проекта формируется в соответствии с рекомендациями из книги **"Two Scoops of Django"**. Это включает:
- разделение настроек по окружениям
- модульный подход к приложениям
- чистые и изолированные сервисы
- единообразные пути импорта

### 5. Запуск проекта
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### 6. Список всех api 
http://127.0.0.1/api/docs
---

