from rest_framework import routers

from conversation.views import ConversationViewSet

router = routers.SimpleRouter()
router.register(r'conversations', ConversationViewSet, 'conversations')
