from django.db import models
from django.contrib.auth.models import AbstractUser , PermissionsMixin , BaseUserManager

# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        print('---------user ')
        extra_fields['is_active'] = True
        if not email:
            raise ValueError('The Email field must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        print("-------------------------------------")
        extra_fields['is_active'] = True
        extra_fields['is_staff'] = True
        extra_fields['is_superuser'] = True

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser, PermissionsMixin):
    first_name = None
    last_name = None
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=[
        ('user', 'User'),
        ('admin', 'Admin'),
    ])

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    
    





# class Order(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='orders')
#     cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='orders')
#     order_date = models.DateTimeField(auto_now_add=True)
#     status = models.CharField(max_length=50, default='Pending')
#     total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
#     shipping_address = models.CharField(max_length=255, blank=True, null=True)

#     def __str__(self):
#         return f"Order {self.id} by {self.user.email}"

# class OrderItem(models.Model):
#     order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField(default=1)
#     price = models.DecimalField(max_digits=10, decimal_places=2)

#     def __str__(self):
#         return f"{self.quantity} of {self.product.name} in Order {self.order.id}"
    
