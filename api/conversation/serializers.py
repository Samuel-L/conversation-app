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
    def __init__(self, *args, **kwargs):
        """
        Filter out conversations where requesting user is not
        'user_a' or 'user_b'.
        """
        super(MessageSerializer, self).__init__(*args, **kwargs)
        request_user = self.context['request'].user
        self.fields['conversation'].queryset = Conversation.objects.filter(
            Q(user_a=request_user) | Q(user_b=request_user)
        )

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
