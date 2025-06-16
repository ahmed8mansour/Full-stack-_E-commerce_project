from rest_framework import serializers
from rest_framework.response import Response

from .models import Product , ProductFAQs , ProductReview

class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)
    

class ProductHomepageCardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductDefaultStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductFilteringSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductSpecificSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductFAQsSerializer(serializers.ModelSerializer):
    class Meta:
        model= ProductFAQs
        fields = '__all__'


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model= ProductReview
        fields = '__all__'