
from django.contrib.auth import get_user_model
from rest_framework import viewsets, decorators, permissions
from authapi.api.serializers import UserSerializer, RegistrationSerializer
from rest_framework.response import Response
from rest_framework import status, filters, mixins

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes=[permissions.IsAuthenticated, permissions.IsAdminUser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'first_name']


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        password = serializer.validated_data.pop('password', None)
        instance = serializer.save()
        if password:
            instance.set_password(password)
            instance.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @decorators.action(methods=['post'], detail=False, permission_classes=[permissions.AllowAny])
    def register(self, request, *args, **kwargs):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.validated_data.pop('password2', None)
        password = serializer.validated_data.pop('password', None)
        instance = serializer.save()
        if password:
            instance.set_password(password)
            instance.save()
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        password = serializer.validated_data.pop('password', None)

        self.perform_update(serializer)

        if password:
            instance.set_password(password)
            instance.save()

        return Response(serializer.data)       
