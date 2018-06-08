from django.test import TestCase

from conversation.models import Conversation
from conversation.serializers import ConversationSerializer

class ConversationSerializerTests(TestCase):
    fixtures = ['user_fixture.json', 'conversation_fixture.json']

    def setUp(self):
        self.conversation = Conversation.objects.get(pk=1)
        self.serializer = ConversationSerializer(instance=self.conversation)
        self.data = self.serializer.data

    def test_contains_expected_fields(self):
        self.assertEqual(self.data.keys(), set([
            'id', 'user_a', 'user_b', 'created_at', 'updated_at', 'is_archived', 'topic',
        ]))

    def test_serializer_fields_content(self):
        self.assertEqual(self.data['user_a'], self.conversation.user_a.username)
        self.assertEqual(self.data['user_b'], self.conversation.user_b.username)
        self.assertEqual(self.data['created_at'], self.conversation.created_at)
        self.assertEqual(self.data['updated_at'], self.conversation.updated_at)
        self.assertEqual(self.data['is_archived'], self.conversation.is_archived)
        self.assertEqual(self.data['topic'], self.conversation.topic)
