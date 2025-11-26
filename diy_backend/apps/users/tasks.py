# users/tasks.py
from celery import shared_task
from django.contrib.auth import get_user_model

User = get_user_model()  # ✅ Правильный способ

@shared_task
def send_verification_email_task(user_id):
    """Асинхронная отправка письма"""
    from .services.email_service import EmailService  # ✅ Импорт внутри функции
    
    try:
        user = User.objects.get(id=user_id)
        EmailService.send_verification_email(user)
    except User.DoesNotExist:
        pass