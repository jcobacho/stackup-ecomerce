
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from typing import Dict, Any
User = get_user_model()

# Serializers define the API representation.
class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(required=False, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'username', 'password', 'is_staff', 'is_seller', 'is_shopper']                


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data = super().validate(attrs)
        data["user"] = UserSerializer(self.user).data

        return data