from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiResponse
from ...serializers.register import RegisterSerializer
from rest_framework.generics import CreateAPIView
from ...services.email_service import EmailService
from rest_framework.permissions import AllowAny
from ...tasks import send_verification_email_task

class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    @extend_schema(request=RegisterSerializer, responses=201)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Отправляем письмо с подтверждением
        try:
            send_verification_email_task.delay(user.id)
        except Exception as e:
            # Логируем ошибку, но регистрация прошла успешно
            print(f"Failed to send verification email: {e}")
        
        return Response(
            {
                "success": True,
                "message": "Пользователь создан. Проверьте почту для подтверждения email",
                "email": user.email
            },
            status=status.HTTP_201_CREATED
        )