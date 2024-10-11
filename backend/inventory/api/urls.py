from rest_framework.routers import DefaultRouter
from django.urls import path

from inventory.api.views import ProductViewSet

router = DefaultRouter()
router.register("", ProductViewSet)


urlpatterns = [] + router.urls