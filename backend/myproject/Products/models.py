from django.db import models
from custom_auth.models import CustomUser
# Create your models here.

class Product(models.Model):
    style_options = (
        ('casual', 'Casual'),
        ('formal', 'Formal'),
        ('gym', 'Gym'),
        ('party', 'Party'),
    )

    # id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    style = models.CharField(max_length=50, choices=style_options)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='products')
    price_before = models.DecimalField(max_digits=10, decimal_places=2)
    price_after = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    available_discount = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    available_colors = models.JSONField(blank=True, null=True, default=list) # ['','']
    available_sizes = models.JSONField(blank=True, null=True, default=list)
    rate = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    adding_date = models.DateTimeField(auto_now_add=True)

    image1 = models.ImageField(upload_to='products/', blank=True, null=True)
    image2 = models.ImageField(upload_to='products/', blank=True, null=True)    
    image3 = models.ImageField(upload_to='products/', blank=True, null=True)

    def save(self, *args, **kwargs):

        self.price_after = self.price_before * (1 - self.available_discount)
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f'{self.style} and {self.category.name} pk: {self.id}'
    

# 1:Hoddie >> pk
# 2:t-shirts
# 3:shirts
# 4:shorts
# 5:jeans

class Category(models.Model):

    name = models.CharField(max_length=255, unique=True)
        
    def __str__(self):
        return self.name


class ProductReview(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='reviews')
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    
    def save(self, *args, **kwargs):
        if not self.name and self.user:
            self.name = self.user.email
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Review by {self.user.email} for {self.product.id}"
    
class ProductFAQs(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='faqs')
    question = models.TextField()
    answer = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"FAQ for {self.product.id}: {self.question}"

