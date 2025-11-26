# users/tests/test_email_verification.py
from django.test import TestCase
from django.core import mail  # ← импортируем mail
from django.contrib.auth import get_user_model
from apps.users.models import EmailVerificationToken
from apps.users.services.email_service import EmailService

User = get_user_model()


class EmailVerificationTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='abylajsuev@gmail.com',
            password='testpass123'
        )

    def test_token_creation_and_email_sent(self):
        """Тест создания токена и отправки письма"""
        # Очищаем outbox перед тестом
        mail.outbox = []
        
        token = EmailService.send_verification_email(self.user)
        
        # Проверяем токен
        self.assertIsNotNone(token)
        self.assertTrue(token.is_valid())
        
        # Проверяем, что письмо отправлено
        self.assertEqual(len(mail.outbox), 1)
        
        # Проверяем содержимое письма
        email = mail.outbox[0]
        self.assertEqual(email.to[0], 'abylajsuev@gmail.com')
        self.assertIn('Подтвердите email', email.subject)
        self.assertIn(str(token.token), email.body)
        
        # Выводим письмо в консоль для визуальной проверки
        print("\n" + "="*50)
        print("📧 ПИСЬМО ОТПРАВЛЕНО:")
        print("="*50)
        print(f"Кому: {email.to}")
        print(f"Тема: {email.subject}")
        print(f"Содержимое:\n{email.body}")
        print("="*50 + "\n")

    def test_token_expiration(self):
        token = EmailVerificationToken.objects.create(user=self.user)
        from django.utils import timezone
        from datetime import timedelta
        token.expires_at = timezone.now() - timedelta(hours=1)
        token.save()
        self.assertFalse(token.is_valid())