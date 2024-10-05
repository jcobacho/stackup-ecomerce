# from django.db import models
# from django.contrib.auth.models import AbstractUser, Permission
# from django.utils.translation import gettext_lazy as _
# from django.contrib.auth.base_user import BaseUserManager

# in case authentication by email is required
# class CustomUserManager(BaseUserManager):
#     use_in_migrations = True

#     def _create_user(self, email, password, **extra_fields):
#         """
#         Create and save a user with the given username, email, and password.
#         """
#         if not email:
#             raise ValueError('The given email must be set')
#         email = self.normalize_email(email)
        
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)

#         return user

#     def create_user(self, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', False)
#         extra_fields.setdefault('is_superuser', False)
#         return self._create_user(email, password, **extra_fields)

#     def create_superuser(self, email, password, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)

#         if extra_fields.get('is_staff') is not True:
#             raise ValueError('Superuser must have is_staff=True.')
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError('Superuser must have is_superuser=True.')

#         return self._create_user(email, password, **extra_fields)

# # Create your models here.
# class User(AbstractUser):
#     username = models.CharField(
#         verbose_name=_("Username"),
#         max_length=150,
#         unique=True,
#         null=True,
#         blank=True,
#         error_messages={"unique": _("A user with that Nickname already exists.")},
#     )
#     email = models.EmailField(_('Email Address'), unique=True)
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []

#     objects = CustomUserManager()

#     def __str__(self):
#         return self.get_full_name() or self.email