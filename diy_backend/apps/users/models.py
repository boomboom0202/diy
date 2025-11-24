from django.contrib.auth.models import AbstractUser
from django.db import models
from .managers import CustomUserManager
class User(AbstractUser):
    email = models.EmailField(unique=True, db_index=True)
    is_email_verified = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    objects = CustomUserManager()
    def __str__(self):
        return self.email