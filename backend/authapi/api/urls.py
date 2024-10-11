from rest_framework.routers import DefaultRouter
from django.urls import path

from authapi.api.views import UserViewSet

router = DefaultRouter()
router.register("", UserViewSet)


urlpatterns = [] + router.urls