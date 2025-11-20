# __init__.py
import os
from dotenv import load_dotenv

load_dotenv()

# Получаем окружение, по умолчанию development
ENV = os.environ.get('DJANGO_ENV', os.environ.get('DJANGO_SETTINGS_MODULE', 'development')).lower()

settings_map = {
    'production': 'production',
    'testing': 'testing',
    'development': 'development'
}

# Выбираем настройки по ENV
selected = settings_map.get(ENV, 'development')

# Динамический импорт
if selected == 'production':
    from .production import *
elif selected == 'testing':
    from .testing import *
else:
    from .development import *

print(f">>> LOADED: {selected}.py")
