from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.test import APITestCase

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
        self.assertEqual(response.data['user_a'], self.user.username)

    def test_only_returns_conversations_where_user_is_included(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2) 

class MessageViewSet(APITestCase):
    fixtures = ['user_fixture.json', 'conversation_fixture.json', 'message_fixture.json']

    def setUp(self):
        self.url = reverse('messages-list')
        self.detail_url = reverse('messages-detail', kwargs={'pk': 1})
        self.user_a = User.objects.get(pk=1)
        self.user_b = User.objects.get(pk=2)
        self.data = { 'conversation': 1, 'is_read': False, 'body': 'This is a text message' }

    def test_sent_by_is_set_by_view(self):
        self.client.force_authenticate(user=self.user_a)

        response = self.client.post(self.url, data=self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['sent_by'], self.user_a.username)

    def test_sent_to_is_set_by_view(self):
        self.client.force_authenticate(user=self.user_a)

        response = self.client.post(self.url, data=self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['sent_to'], self.user_b.username)

    def test_only_returns_messages_where_user_is_included(self):
        self.client.force_authenticate(user=self.user_a)

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_only_receiver_can_alter_is_read_field(self):
        self.client.force_authenticate(user=self.user_a)
        response = self.client.patch(self.detail_url, { 'is_read': True })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.force_authenticate(user=self.user_b)
        response = self.client.patch(self.detail_url, { 'is_read': True})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cannot_send_messages_on_archived_conversation(self):
        self.client.force_authenticate(user=self.user_a)
        self.data['conversation'] = 3

        response = self.client.post(self.url, data=self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cannot_send_messages_on_conversation_where_not_included(self):
        """
        User should not be able to send messages on conversations where they're
        not included.
        """
        self.client.force_authenticate(user=self.user_a)
        self.data['conversation'] = 4

        response = self.client.post(self.url, data=self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data[0], 'You are not part of that conversation!')

    def test_uses_query_parameter_if_it_exists(self):
        self.client.force_authenticate(user=self.user_a)
        
        response = self.client.get(self.url, { 'conversation': 1 })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
