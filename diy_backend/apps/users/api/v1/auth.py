from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.middleware.csrf import get_token
from ...serializers.register import RegisterSerializer
from drf_spectacular.utils import extend_schema, OpenApiResponse
from drf_spectacular.utils import inline_serializer
from rest_framework import serializers

# Логин — переопределяем, чтобы ставить куки
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        tokens = response.data
        access = tokens.pop("access")
        refresh = tokens.pop("refresh")

        res = Response({"detail": "Успешный вход", "access": access,"refresh": refresh},status=status.HTTP_200_OK)
        res.set_cookie(
            key="access",
            value=access,
            httponly=True,
            secure=True,
            samesite="Lax",
            max_age=15 * 60,
        )
        res.set_cookie(
            key="refresh",
            value=refresh,
            httponly=True,
            secure=True,
            samesite="Lax",
            max_age=7 * 24 * 60 * 60,
        )
        # Для double-submit CSRF
        res.set_cookie("csrftoken", get_token(request), httponly=False, samesite="Lax")
        return res

# Регистрация
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        request=RegisterSerializer,
        responses={201: OpenApiResponse(description="Пользователь создан")},
    )
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"detail": "Пользователь создан"}, status=status.HTTP_201_CREATED)

# Логаут (чистим куки)
class LogoutView(APIView):
    @extend_schema(
        request=None,
        responses={200: OpenApiResponse(description="Успешный выход")},
    )
    def post(self, request):
        response = Response({"detail": "Успешный выход"})
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        response.delete_cookie("csrftoken")
        return response


class MeView(APIView):
    @extend_schema(
        responses={
            200: inline_serializer(
                name="MeSerializer",
                fields={
                    "id": serializers.IntegerField(),
                    "email": serializers.EmailField(),
                    "username": serializers.CharField(allow_null=True),
                    "first_name": serializers.CharField(),
                    "last_name": serializers.CharField(),
                }
            )
        }
    )
    def get(self, request):
        return Response({
            "id": request.user.id,
            "email": request.user.email,
            "username": request.user.username,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
        })