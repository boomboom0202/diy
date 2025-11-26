from rest_framework.response import Response
from rest_framework import status

def ok(message, **extra):
    return Response({"detail": message, **extra}, status=status.HTTP_200_OK)

def created(message, **extra):
    return Response({"detail": message, **extra}, status=status.HTTP_201_CREATED)

def bad_request(message, **extra):
    return Response({"detail": message, **extra}, status=status.HTTP_400_BAD_REQUEST)

