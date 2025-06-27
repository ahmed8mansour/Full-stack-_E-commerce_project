from django.db import models

from custom_auth.models import CustomUser
from Products.models import Product

# Create your models here.

class Cart(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='cart')
    # products = models.ManyToManyField(Product, through='CartItem')
    created_at = models.DateTimeField(auto_now_add=True)
    delivery_fee = models.IntegerField(default=15)
    Subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    Total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    available_discount = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Cart of {self.user.email} "
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    selected_color = models.CharField(max_length=255, default="red")
    selected_size = models.CharField(max_length=255, default="Small")
    price = models.DecimalField(max_digits=10, decimal_places=2) # Price per item (after discount)
    total_price = models.DecimalField(max_digits=10, decimal_places=2) # Total price for the item (quantity * price)

    def save(self, *args, **kwargs):
        self.total_price = self.quantity * self.price
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.quantity} of {self.product.name} in {self.cart.user.email}'s cart"
