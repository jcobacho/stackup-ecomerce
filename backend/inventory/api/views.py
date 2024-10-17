from sales.models import Order, OrderItem
from sales.api.serializers import CartSerializer
from inventory.models import Product
from inventory.api.serializers import ProductAddCartSerializer
from rest_framework import status, viewsets
from inventory.api.serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from api.permissions import IsShopper

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_serializer_class(self):
        if self.action == 'add_to_cart':
            return ProductAddCartSerializer
        return self.serializer_class


    @action(methods=['post'], detail=True, permission_classes=[IsAuthenticated, IsShopper])
    def add_to_cart(self, request, pk=None):

        product = self.get_object()
        cart_qs = Order.objects.filter(client=request.user, paid=False)
        if not cart_qs.exists():
            raise Exception("cart not found")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        add_to_quantity = serializer.validated_data.get('quantity')       
        set_qty = serializer.validated_data.get('set_qty', False)        
        
        cart = cart_qs.first()
        # check if an order item exists
        orderitem_qs = OrderItem.objects.filter(product=product, order=cart)
        if orderitem_qs.exists():
            orderitem = orderitem_qs.first()
            
            # with set qty the orderitem qty will be the same as the request param
            if set_qty:
                qty = add_to_quantity
            else:
                qty = orderitem.qty + add_to_quantity


            # remove item in case of 0 quantity
            if qty == 0:
                orderitem.delete()

            else:
                # set the quantity
                orderitem.qty = qty
                orderitem.save()
        else:
            # create order item
            orderitem = OrderItem.objects.create(product=product, order=cart, qty= add_to_quantity, price=product.price)

        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)

