from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema
from ...utils.responses import created
from ...utils.cookies import set_auth_cookies, set_csrf_cookie, clear_auth_cookies
from ...utils.responses import ok
from ...serializers.auth import MeSerializer, RegisterSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView

class CustomTokenObtainPairView(TokenObtainPairView):

    @extend_schema(responses=200)
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        access = response.data.pop("access")
        refresh = response.data.pop("refresh")
        res = ok("Успешный вход", access=access, refresh=refresh)
        set_auth_cookies(res, access, refresh)
        set_csrf_cookie(res, request)

        return res


class LogoutView(APIView):
    @extend_schema(responses=200)
    def post(self, request):
        response = ok("Успешный выход")
        clear_auth_cookies(response)
        return response

class VerifyEmailView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        token = request.data.get('token')
        # Логика проверки токена
        # user.is_email_verified = True
        # user.save()
        return ok("Email успешно верифицирован")

class MeView(APIView):
    @extend_schema(responses=MeSerializer)
    def get(self, request):
        serializer = MeSerializer(request.user)
        return Response(serializer.data)
    
    def patch(self, request):
        """Позволить пользователю обновить свой профиль"""
        serializer = MeSerializer(
            request.user, 
            data=request.data, 
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    @extend_schema(request=RegisterSerializer, responses=201)
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return created("Пользователь создан")