from rest_framework import serializers
from ...users.models import EmailVerificationToken

class EmailVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    token = serializers.CharField(max_length=100)
    