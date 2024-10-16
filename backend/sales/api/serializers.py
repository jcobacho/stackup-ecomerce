
from sales.models import Order, OrderItem
from inventory.api.serializers import ProductSerializer
from rest_framework import serializers
from typing import Dict, Any

class OrderItemSerializer(serializers.ModelSerializer):

    # product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = ['id', 'short_name', 'price', 'qty', 'product', 'image_url']


class CartSerializer(serializers.ModelSerializer):

    orderitems = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'orderitems', 'total_amount', 'total_quantity']

    def get_orderitems(self, obj):
        return OrderItemSerializer(OrderItem.objects.filter(order__pk=obj.pk), many=True).data


class OrderSerializer(serializers.ModelSerializer):

    orderitems = serializers.SerializerMethodField()

    client = serializers.SerializerMethodField(source='client.username')

    class Meta:
        model = Order
        fields = ['id', 'client', 'orderitems', 'paid']

    def get_orderitems(self, obj):
        return OrderItemSerializer(OrderItem.objects.filter(order__pk=obj.pk), many=True).data

    def get_client(self, obj):
        return obj.client.__str__()
        

class OrderCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ['id', 'client']
