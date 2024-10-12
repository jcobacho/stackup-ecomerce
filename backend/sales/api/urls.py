from rest_framework.routers import DefaultRouter
from django.urls import path

from sales.api.views import OrderViewSet

router = DefaultRouter()
router.register("", OrderViewSet)


urlpatterns = [] + router.urls