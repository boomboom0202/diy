from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from ...users.models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, 
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ('email', 'username' ,'password', 'password2', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False}
        }

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({
                "password2": "Пароли не совпадают"
            })
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        return User.objects.create_user(**validated_data)

class MeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "username", "first_name", "last_name")