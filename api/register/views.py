from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny

from utils.permissions import IsOwnerOrReadOnly
from register.models import Profile
from register.serializers import RegisterSerializer, ProfileSerializer

class RegisterViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

class ProfileViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin,
    mixins.ListModelMixin, mixins.UpdateModelMixin):
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
