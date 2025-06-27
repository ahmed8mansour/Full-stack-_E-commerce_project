from rest_framework import serializers
from .models import Cart , CartItem
from Products.serializers import ProductSerializer

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'

    
class CartItemListSerializer(serializers.ModelSerializer):
    total_price = serializers.IntegerField()
    product =ProductSerializer(read_only=True)
    cart = CartSerializer(read_only= True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'price', 'total_price', 'cart' , 'selected_color' , 'selected_size' ]
    
    def get_total_price(self , obj):
        return int(obj.total_price)



class CartItemUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'
        extra_kwargs = {
            'quantity': {'required': True, 'min_value': 1},
            'price': {'required': False},
            'total_price': {'required': False},
            'cart': {'required': False},
            'product': {'required': False}
        }
    