
from sales.models import Order
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from sales.api.serializers import OrderSerializer, OrderCreateSerializer, CartSerializer
from rest_framework.response import Response
from rest_framework import status
from sales.api.permissions import IsOwner

class CartViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = CartSerializer
    permission_classes = (IsAuthenticated, IsOwner)
    pagination_class = None
    queryset = Order.objects.all()

    def get_queryset(self):
        return self.queryset.filter(client=self.request.user, paid=False)

    def list(self, request, *args, **kwargs):
        """
        Return current user order.
        """
        qs = self.get_queryset()
        if qs.exists():
            order = qs.first()
        else:
            order = Order.objects.create(paid=False, client=request.user)

        return Response(self.serializer_class(order).data)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_serializer_class(self, **kwargs):
        if self.action == 'create':
            return OrderCreateSerializer
        return self.serializer_class

