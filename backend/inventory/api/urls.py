from rest_framework.routers import DefaultRouter
from django.urls import path

from inventory.api.views import ProductViewSet, AdminProductViewSet

router = DefaultRouter()
router.register("admin", AdminProductViewSet, basename='adminproducts')
router.register("", ProductViewSet)


urlpatterns = [] + router.urls