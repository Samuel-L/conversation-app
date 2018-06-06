from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny

from register.serializers import RegisterSerializer

class RegisterViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
