# users/tests/test_email_verification.py
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from datetime import timedelta

from apps.users.models import EmailVerificationToken
from apps.users.services.email_service import EmailService

User = get_user_model()


class EmailVerificationTokenTestCase(TestCase):
    """Тесты модели токена"""
    
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )

    def test_token_creation(self):
        """Тест создания токена"""
        token = EmailService.send_verification_email(self.user)
        self.assertIsNotNone(token)
        self.assertTrue(token.is_valid())
        self.assertFalse(token.is_used)

    def test_token_expiration(self):
        """Тест истечения срока токена"""
        token = EmailVerificationToken.objects.create(user=self.user)
        token.expires_at = timezone.now() - timedelta(hours=1)
        token.save()
        self.assertFalse(token.is_valid())

    def test_token_already_used(self):
        """Тест использованного токена"""
        token = EmailVerificationToken.objects.create(user=self.user)
        token.is_used = True
        token.save()
        self.assertFalse(token.is_valid())

    def test_token_auto_expiration_date(self):
        """Тест автоматической установки даты истечения"""
        token = EmailVerificationToken.objects.create(user=self.user)
        self.assertIsNotNone(token.expires_at)
        self.assertGreater(token.expires_at, timezone.now())


class EmailVerificationAPITestCase(APITestCase):
    """Тесты API верификации email"""
    
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        self.verify_url = lambda token: reverse('verify-email', kwargs={'token': token})
        self.resend_url = reverse('resend-verification')

    def test_successful_email_verification(self):
        """Тест успешной верификации email"""
        token = EmailVerificationToken.objects.create(user=self.user)
        
        response = self.client.post(self.verify_url(token.token))
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_email_verified)
        
        token.refresh_from_db()
        self.assertTrue(token.is_used)

    def test_verify_with_expired_token(self):
        """Тест верификации с истекшим токеном"""
        token = EmailVerificationToken.objects.create(user=self.user)
        token.expires_at = timezone.now() - timedelta(hours=1)
        token.save()
        
        response = self.client.post(self.verify_url(token.token))
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_email_verified)

    def test_verify_with_used_token(self):
        """Тест верификации с уже использованным токеном"""
        token = EmailVerificationToken.objects.create(user=self.user, is_used=True)
        
        response = self.client.post(self.verify_url(token.token))
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('использован', response.data['message'].lower())

    def test_verify_with_invalid_token(self):
        """Тест верификации с несуществующим токеном"""
        import uuid
        fake_token = uuid.uuid4()
        
        response = self.client.post(self.verify_url(fake_token))
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_resend_verification_email_authenticated(self):
        """Тест повторной отправки письма для авторизованного пользователя"""
        self.client.force_authenticate(user=self.user)
        
        response = self.client.post(self.resend_url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Проверяем, что токен создан
        self.assertTrue(
            EmailVerificationToken.objects.filter(user=self.user, is_used=False).exists()
        )

    def test_resend_verification_email_unauthenticated(self):
        """Тест повторной отправки без авторизации"""
        response = self.client.post(self.resend_url)
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_resend_verification_already_verified(self):
        """Тест повторной отправки для уже подтвержденного email"""
        self.user.is_email_verified = True
        self.user.save()
        self.client.force_authenticate(user=self.user)
        
        response = self.client.post(self.resend_url)
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('уже подтвержден', response.data['message'].lower())

    def test_resend_rate_limiting(self):
        """Тест ограничения частоты повторной отправки"""
        self.client.force_authenticate(user=self.user)
        
        # Первая отправка
        response1 = self.client.post(self.resend_url)
        self.assertEqual(response1.status_code, status.HTTP_200_OK)
        
        # Вторая отправка сразу же
        response2 = self.client.post(self.resend_url)
        self.assertEqual(response2.status_code, status.HTTP_429_TOO_MANY_REQUESTS)


class RegistrationWithEmailVerificationTestCase(APITestCase):
    """Тесты регистрации с отправкой письма"""
    
    def setUp(self):
        self.register_url = reverse('register')
        self.user_data = {
            'email': 'newuser@example.com',
            'password': 'StrongPass123!',
            'password2': 'StrongPass123!',
            'first_name': 'John',
            'last_name': 'Doe'
        }

    def test_registration_creates_verification_token(self):
        """Тест создания токена при регистрации"""
        response = self.client.post(self.register_url, self.user_data)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        user = User.objects.get(email=self.user_data['email'])
        self.assertFalse(user.is_email_verified)
        
        # Проверяем, что токен создан
        token_exists = EmailVerificationToken.objects.filter(
            user=user,
            is_used=False
        ).exists()
        self.assertTrue(token_exists)

    def test_user_cannot_login_with_unverified_email(self):
        """Тест: можно ли войти с неподтвержденным email (опционально)"""
        # Регистрируемся
        self.client.post(self.register_url, self.user_data)
        
        # Пытаемся войти
        login_url = reverse('login')
        response = self.client.post(login_url, {
            'email': self.user_data['email'],
            'password': self.user_data['password']
        })
        
        # Вход должен быть успешным (или нет, если вы это блокируете)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class EmailServiceTestCase(TestCase):
    """Тесты сервиса отправки email"""
    
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User'
        )

    def test_send_verification_email(self):
        """Тест отправки письма с верификацией"""
        from django.core import mail
        
        token = EmailService.send_verification_email(self.user)
        
        # Проверяем, что письмо отправлено
        self.assertEqual(len(mail.outbox), 1)
        
        # Проверяем содержимое
        email = mail.outbox[0]
        self.assertIn(self.user.email, email.to)
        self.assertIn('Подтвердите email', email.subject)
        self.assertIn(str(token.token), email.body)

    def test_send_welcome_email(self):
        """Тест отправки приветственного письма"""
        from django.core import mail
        
        EmailService.send_welcome_email(self.user)
        
        self.assertEqual(len(mail.outbox), 1)
        email = mail.outbox[0]
        self.assertIn(self.user.email, email.to)
        self.assertIn('Добро пожаловать', email.subject)

    def test_multiple_tokens_per_user(self):
        """Тест создания нескольких токенов для одного пользователя"""
        token1 = EmailService.send_verification_email(self.user)
        token2 = EmailService.send_verification_email(self.user)
        
        self.assertNotEqual(token1.token, token2.token)
        
        # Оба токена должны быть валидны
        self.assertTrue(token1.is_valid())
        self.assertTrue(token2.is_valid())
