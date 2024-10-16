
from inventory.models import Product
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from typing import Dict, Any

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'image_url', 'price']
        
        
class ProductAddCartSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField(required=False, min_value=1)

    class Meta:
        model = Product
        fields = ("id", "quantity")