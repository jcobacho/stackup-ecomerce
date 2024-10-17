
from inventory.models import Product
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from typing import Dict, Any

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'image_url', 'price', 'owner']
        extra_kwargs = {
            'owner': {'read_only': True},            
        }
        
        
class ProductAddCartSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField(min_value=0)
    set_qty = serializers.BooleanField(required=False)

    class Meta:
        model = Product
        fields = ("id", "quantity", "set_qty")