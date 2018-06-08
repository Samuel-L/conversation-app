from rest_framework import routers

from conversation.views import ConversationViewSet, MessageViewSet

router = routers.SimpleRouter()
router.register(r'conversations', ConversationViewSet, 'conversations')
router.register(r'messages', MessageViewSet, 'messages')
