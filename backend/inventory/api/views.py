
from inventory.models import Product
from rest_framework import viewsets
from inventory.api.serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer