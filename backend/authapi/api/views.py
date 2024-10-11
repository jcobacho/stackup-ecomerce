
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from authapi.api.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print("repr(serializer)")
        print(repr(serializer))
        serializer.is_valid(raise_exception=True)

        password = serializer.validated_data.pop('password', None)
        instance = serializer.save()
        if password:
            instance.set_password(password)
            instance.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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
