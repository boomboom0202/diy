# users/api/v1/email_verification.py
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from ...models import EmailVerificationToken
from ...services.email_service import *
from ...utils.responses import *


class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        responses={200: {"description": "Email успешно подтвержден"}},
        description="Подтверждение email по токену"
    )
    def post(self, request, token):
        """Подтверждение email"""
        verification_token = get_object_or_404(
            EmailVerificationToken, 
            token=token
        )

        # Проверяем валидность токена
        if not verification_token.is_valid():
            if verification_token.is_used:
                return bad_request("Токен уже использован", status=400)
            else:
                return bad_request("Токен истек. Запросите новый", status=400)

        # Подтверждаем email
        user = verification_token.user
        user.is_email_verified = True
        user.save()

        # Помечаем токен как использованный
        verification_token.is_used = True
        verification_token.save()

        # Отправляем приветственное письмо (опционально)
        try:
            EmailService.send_welcome_email(user)
        except Exception as e:
            # Логируем ошибку, но не падаем
            print(f"Failed to send welcome email: {e}")

        return ok("Email успешно подтвержден")


class ResendVerificationEmailView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={200: {"description": "Письмо отправлено"}},
        description="Повторная отправка письма с подтверждением"
    )
    def post(self, request):
        """Повторная отправка письма с подтверждением"""
        user = request.user

        # Если уже подтвержден
        if user.is_email_verified:
            return bad_request("Email уже подтвержден", status=400)

        # Проверяем, не было ли недавней отправки (защита от спама)
        last_token = EmailVerificationToken.objects.filter(
            user=user,
            is_used=False
        ).first()

        if last_token and last_token.is_valid():
            from django.utils import timezone
            time_since_created = (timezone.now() - last_token.created_at).seconds
            
            if time_since_created < 60:  # меньше минуты
                return bad_request(
                    f"Подождите {60 - time_since_created} секунд перед повторной отправкой",
                    status=429
                )

        try:
            EmailService.send_verification_email(user, request)
            return ok("Письмо с подтверждением отправлено")
        except Exception as e:
            return bad_request(f"Ошибка отправки: {str(e)}", status=500)