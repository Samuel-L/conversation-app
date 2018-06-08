from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.exceptions import ValidationError

from utils.permissions import IsPartOfConversation
from conversation.models import Conversation
from conversation.serializers import ConversationSerializer

class ConversationViewSet(viewsets.ModelViewSet):
    serializer_class = ConversationSerializer
    permission_classes = [IsPartOfConversation]

    def get_queryset(self):
        """
        Only return conversations where requesting user is included.
        """
        conversations = Conversation.objects.filter(Q(user_a=self.request.user) | Q(user_b=self.request.user))
        return conversations

    def perform_create(self, serializer):
        if serializer.validated_data['user_b'] == self.request.user:
            raise ValidationError('You cannot create a conversation with yourself')
        serializer.save(user_a=self.request.user)
