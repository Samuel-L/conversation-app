from django.db.models import Q
from rest_framework import serializers
from django.contrib.auth.models import User

from conversation.models import Conversation, Message

class ConversationSerializer(serializers.ModelSerializer):
    user_a = serializers.ReadOnlyField(source="user_a.username")
    user_b = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())
    created_at = serializers.ReadOnlyField()
    updated_at = serializers.ReadOnlyField()

    class Meta:
        model = Conversation
        fields = ('id', 'user_a', 'user_b', 'created_at', 'updated_at', 'is_archived', 'topic')

class MessageSerializer(serializers.ModelSerializer):
    sent_by = serializers.ReadOnlyField(source="sent_by.username")
    sent_to = serializers.ReadOnlyField(source="sent_to.username")
    created_at = serializers.ReadOnlyField()
    
    class Meta:
        model = Message
        fields = ('id', 'sent_by', 'sent_to', 'conversation', 'created_at', 'is_read', 'body')

class IsReadMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'is_read')
