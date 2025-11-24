from .base import *
import os

DEBUG = True

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')


SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', '')


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME_DEV', ''),
        'USER': os.environ.get('DB_USER', ''),
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),
        'HOST': os.environ.get('DB_HOST', ''),
        'PORT': os.environ.get('DB_PORT', ''),
    }
}









