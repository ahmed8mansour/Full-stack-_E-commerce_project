from django.contrib import admin

from .models import Product, Category , ProductReview, ProductFAQs

# Register your models here.

admin.site.register(ProductReview)
admin.site.register(ProductFAQs)
admin.site.register(Product)
admin.site.register(Category)