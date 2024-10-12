
from sales.models import Order
from rest_framework import viewsets
from sales.api.serializers import OrderSerializer, OrderCreateSerializer
from rest_framework.response import Response
from rest_framework import status


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_serializer_class(self, **kwargs):
        if self.action == 'create':
            return OrderCreateSerializer
        return self.serializer_class

