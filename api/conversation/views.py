from django.db.models import Q
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.exceptions import ValidationError

from utils.permissions import IsPartOfConversation, IsSenderOrReceiver, IsReceiver
from conversation.models import Conversation, Message
from conversation.serializers import ConversationSerializer, MessageSerializer, IsReadMessageSerializer

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

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        """
        Only return messages where requesting user is sender
        or receiver.
        """
        messages = Message.objects.filter(Q(sent_by=self.request.user) | Q(sent_to=self.request.user))
        return messages

    def perform_create(self, serializer):
        """
        Set the 'sent_by' field to the requesting user and the 'sent_to'
        field to the other part of the conversation.
        """
        conversation_id = serializer.validated_data['conversation'].id
        conversation = Conversation.objects.get(pk=conversation_id)
        if conversation.user_a == self.request.user:
            sent_to = conversation.user_b
        else: 
            sent_to = conversation.user_a

        if conversation.is_archived:
            raise ValidationError('That conversation is archived!')
        elif conversation.user_a != self.request.user and conversation.user_b != self.request.user:
            raise ValidationError('You are not part of that conversation!')

        created_at = timezone.now()
        serializer.save(sent_by=self.request.user, sent_to=sent_to, created_at=created_at)
        # Update conversation instance's updated_at field.
        conversation.updated_at = created_at
        conversation.save()

    def get_serializer_class(self):
        """
        If request method is PUT or PATCH, return the serializer that only has
        the 'is_read' field
        """
        serializer_class = self.serializer_class
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            serializer_class = IsReadMessageSerializer
        return serializer_class
    
    def get_permissions(self):
        """
        If request method is PUT or PATCH, the requesting user
        needs to be the receiver.
        """
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            return [IsReceiver()]
        return [IsSenderOrReceiver()]
