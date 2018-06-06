from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status

class RegistrationViewSetTests(APITestCase):
    def setUp(self):
        self.url = reverse('register-list')
        self.valid_data = { 'username': 'Account', 'password': 'Password' }

    def test_view_only_accept_POST(self):
        """
        The view should only accept POST requests and reject the other requests
        """
        post_response = self.client.post(self.url, self.valid_data, format='json')
        self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)

        get_response = self.client.get(self.url, format='json')
        self.assertEqual(get_response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_view_created_new_user_object(self):
        """
        When posting to the view, a new user should be created
        """
        response = self.client.post(self.url, self.valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'Account')
