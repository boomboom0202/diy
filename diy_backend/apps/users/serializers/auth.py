from rest_framework import serializers
from ...users.models import User


class MeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "username", "first_name", "last_name")

class LogoutSerializer(serializers.Serializer):
    pass

class CustomTokenObtainPairSerializer(serializers.Serializer):
    pass