from django.contrib import admin
from .models import CustomUser, Product, Category, Order, Cart, CartItem, OrderItem, ProductReview, productFAQs
# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Order)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(OrderItem)
admin.site.register(ProductReview)
admin.site.register(productFAQs)
