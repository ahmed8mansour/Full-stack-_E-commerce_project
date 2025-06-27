from rest_framework import serializers
from rest_framework.response import Response

from .models import Product , ProductFAQs , ProductReview

class ProductSerializer(serializers.ModelSerializer):
    rate = serializers.SerializerMethodField()
    price_before = serializers.SerializerMethodField()
    price_after = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_rate(self, obj):
        return int(obj.rate) if obj.rate is not None else None

    def get_price_before(self, obj):
        return int(obj.price_before) if obj.price_before is not None else None

    def get_price_after(self, obj):
        return int(obj.price_after) if obj.price_after is not None else None

    def create(self, validated_data):
        return super().create(validated_data)
    

# class ProductHomepageCardsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = '__all__'


# class ProductDefaultStyleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = '__all__'

# class ProductFilteringSerilizer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = '__all__'

# class ProductSpecificSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = '__all__'

    

class ProductFAQsSerializer(serializers.ModelSerializer):
    class Meta:
        model= ProductFAQs
        fields = '__all__'


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model= ProductReview
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['rating'] = int(instance.rating) if instance.rating is not None else None
        return data
