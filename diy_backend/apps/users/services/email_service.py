# users/services/email_service.py
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.utils.html import strip_tags
from ..models import EmailVerificationToken


class EmailService:
    @staticmethod
    def send_verification_email(user, request=None):
        """Отправка письма с подтверждением email"""
        token = EmailVerificationToken.objects.create(user=user)
        
        # Формируем правильную ссылку
        if request:
            domain = request.get_host()
            protocol = 'https' if request.is_secure() else 'http'
        else:
            domain = getattr(settings, 'FRONTEND_URL', 'localhost:8000')
            protocol = 'http'
        
        # Используем reverse для получения правильного URL
        # Или если это фронтенд URL:
        if hasattr(settings, 'FRONTEND_URL') and settings.FRONTEND_URL:
            # Для фронтенда (React/Vue/etc)
            verification_url = f"{settings.FRONTEND_URL}/verify-email/{token.token}/"
        else:
            # Для бэкенд API
            verification_url = f"{protocol}://{domain}/api/v1/auth/verify-email/{token.token}/"
        
        context = {
            'user': user,
            'verification_url': verification_url,
            'site_name': getattr(settings, 'SITE_NAME', 'YourSite'),
            'expires_hours': 24,
        }
        
        html_message = render_to_string('emails/verify_email.html', context)
        plain_message = strip_tags(html_message)
        
        email = EmailMultiAlternatives(
            subject=f'Подтвердите email на {context["site_name"]}',
            body=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[user.email],
        )
        email.attach_alternative(html_message, "text/html")
        email.send()
        
        return token

    @staticmethod
    def send_welcome_email(user):
        """Приветственное письмо после верификации"""
        context = {
            'user': user,
            'site_name': settings.SITE_NAME,
        }
        
        html_message = render_to_string('emails/welcome.html', context)
        plain_message = strip_tags(html_message)
        
        send_mail(
            subject=f'Добро пожаловать на {settings.SITE_NAME}!',
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            html_message=html_message,
        )

    @staticmethod
    def send_password_reset_email(user, token):
        """Отправка письма для сброса пароля"""
        # Аналогично verification email
        pass