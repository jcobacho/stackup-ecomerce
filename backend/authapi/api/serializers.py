
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

class RegistrationSerializer(serializers.ModelSerializer):

    password = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'username', 'password', 'password2', 'is_seller', 'is_shopper'] 
        extra_kwargs = {
            'first_name': {'required': True}
        }

    def validate(self, data):
        """
        Check that passwords match.
        """
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password2":["Password don't match"]})
        return data               


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data = super().validate(attrs)
        data["user"] = UserSerializer(self.user).data

        return data