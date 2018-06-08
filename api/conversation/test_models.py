from django.test import TestCase

from conversation.models import Conversation, Message

class TestConversationModel(TestCase):
    fixtures = ['user_fixture.json', 'conversation_fixture.json']

    def setUp(self):
        self.conversation = Conversation.objects.get(pk=1)

    def test_string_representation(self):
        correct_string_rep = 'Test conversation - User1/User2'
        self.assertEqual(str(self.conversation), correct_string_rep)

class TestMessageModel(TestCase):
    fixtures = ['user_fixture.json', 'conversation_fixture.json', 'message_fixture.json']

    def setUp(self):
        self.message = Message.objects.get(pk=1)

    def test_string_representation(self):
        correct_string_rep = 'Test conversation - User1/User2 (sent by: User1) - 2018-03-16 20:41:28+00:00'
        self.assertEqual(str(self.message), correct_string_rep)
