from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.test import APITestCase

from conversation.models import Conversation

class ConversationViewSet(APITestCase):
    fixtures = ['user_fixture.json', 'conversation_fixture.json']

    def setUp(self):
        self.url = reverse('conversations-list')
        self.user = User.objects.get(pk=1)
        self.data = { 'user_b': 'User2', 'is_archived': False, 'topic': 'TestTopic' }

    def test_does_not_allow_conversation_with_themselves(self):
        self.client.force_authenticate(user=self.user)

        self.data['user_b'] = 'User1'
        response = self.client.post(self.url, data=self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_user_a_is_set_by_view(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.post(self.url, data=self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_only_returns_conversations_where_user_is_included(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1) 

