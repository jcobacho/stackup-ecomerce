from django.db import models
from django.contrib.auth.models import AbstractUser, Permission
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager
    

    

# Create your models here.
class User(AbstractUser):
    is_seller = models.BooleanField(default=False)
    is_shopper = models.BooleanField(default=False)

    # objects = CustomUserManager()

    class Meta:
        ordering = ['username']