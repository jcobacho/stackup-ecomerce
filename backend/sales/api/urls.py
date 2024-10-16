from rest_framework.routers import DefaultRouter
from django.urls import path

from sales.api.views import OrderViewSet, CartViewSet

router = DefaultRouter()
router.register("order", OrderViewSet, basename="order")
router.register("cart", CartViewSet, basename="cart")


urlpatterns = [] + router.urls