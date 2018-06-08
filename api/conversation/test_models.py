from django.test import TestCase

from conversation.models import Conversation

class TestConversationModel(TestCase):
    fixtures = ['user_fixture.json', 'conversation_fixture.json']

    def setUp(self):
        self.conversation = Conversation.objects.get(pk=1)

    def test_string_representation(self):
        correct_string_rep = 'Test conversation - User1/User2'
        self.assertEqual(str(self.conversation), correct_string_rep)
