
from sales.models import Order
from rest_framework import viewsets, mixins, filters
from rest_framework.permissions import IsAuthenticated
from sales.api.serializers import OrderSerializer, OrderCreateSerializer, CartSerializer, PayOrderSerializer
from rest_framework.response import Response
from rest_framework import decorators, status
from django.shortcuts import get_object_or_404

from sales.api.permissions import IsOwner
from api.permissions import IsShopper

class CartViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = CartSerializer
    permission_classes = (IsAuthenticated, IsOwner, IsShopper)
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


class OrderViewSet(mixins.ListModelMixin,
                           viewsets.GenericViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated, IsOwner, IsShopper)
    filter_backends = [filters.SearchFilter]
    search_fields = ['shipping_info__name', 'shipping_info__address', 'shipping_info__city',
                    'shipping_info__country', 'shipping_info__zipcode']

    def get_queryset(self):
        return super().get_queryset().filter(client=self.request.user, paid=True)

