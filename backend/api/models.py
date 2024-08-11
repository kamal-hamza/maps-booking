from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.
class customUserManager(BaseUserManager):
    
    def create_user(self, email, password, **kwargs):
        if not email:
            raise ValueError("All users must have an email")
        if not password:
            raise ValueError("All users must have a password")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password, **kwargs):
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        kwargs.setdefault('is_active', True)

        if kwargs.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff set to True")
        if kwargs.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser set to True")
        if kwargs.get('is_active') is not True:
            raise ValueError("Superuser must have is_active set to True")
        
        return self.create_user(email, password, **kwargs)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = customUserManager()

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email