
from sales.models import Order
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from sales.api.serializers import OrderSerializer, OrderCreateSerializer, CartSerializer, PayOrderSerializer
from rest_framework.response import Response
from rest_framework import decorators, status
from django.shortcuts import get_object_or_404

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

    @decorators.action(methods=['post'], detail=False)
    def empty_cart(self, request):
        
        order = get_object_or_404(Order, client=request.user, paid=False)
        order.orderitem_set.all().delete()
        return Response(CartSerializer(order).data, status=status.HTTP_200_OK)

    @decorators.action(methods=['post'], detail=False)
    def pay_order(self, request):
        order = get_object_or_404(Order, client=request.user, paid=False)

        serializer = PayOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['order'] = order

        shipping_info = serializer.save()

        order.paid=True
        order.shipping_info = shipping_info
        order.save()

        # lets create a new empty cart for the user
        new_order = Order.objects.create(client=request.user, paid=False)
        return Response(CartSerializer(new_order).data, status=status.HTTP_200_OK)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_serializer_class(self, **kwargs):
        if self.action == 'create':
            return OrderCreateSerializer
        return self.serializer_class

