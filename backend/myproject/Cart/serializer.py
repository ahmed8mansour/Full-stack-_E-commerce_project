from rest_framework import serializers
from .models import Cart , CartItem


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'

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

    def update(self, instance, validated_data):
        operation = self.context.get("operation")
        quantity = validated_data['quantity'] # the data from the request

        latest_instance = CartItem.objects.get(id=instance.id)
        if operation == '+':
            latest_instance.quantity += quantity
        elif operation == '-':
            latest_instance.quantity -= quantity
        else:
            raise serializers.ValidationError("Invalid operation. Use '+' or '-'.")
        
        if latest_instance.quantity < 1:
            raise serializers.ValidationError("Quantity cannot be less than 1.")

        latest_instance.save()
        return latest_instance
    