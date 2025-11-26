from django.urls import path
from .api.v1.auth import  LogoutView, MeView, CustomTokenObtainPairView
from .api.v1.email_verification import VerifyEmailView, ResendVerificationEmailView
from .api.v1.register import RegisterView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("me/", MeView.as_view(), name="me"),

    path('verify-email/<uuid:token>/', VerifyEmailView.as_view(), name='verify-email'),
    path('resend-verification/', ResendVerificationEmailView.as_view(), name='resend-verification'),
]   