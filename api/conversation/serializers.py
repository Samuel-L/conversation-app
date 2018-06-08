from rest_framework import serializers
from django.contrib.auth.models import User

from conversation.models import Conversation

class ConversationSerializer(serializers.ModelSerializer):
    user_a = serializers.ReadOnlyField(source="user_a.username")
    user_b = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())
    created_at = serializers.ReadOnlyField()
    updated_at = serializers.ReadOnlyField()

    class Meta:
        model = Conversation
        fields = ('id', 'user_a', 'user_b', 'created_at', 'updated_at', 'is_archived', 'topic')
