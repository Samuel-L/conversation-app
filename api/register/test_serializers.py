from django.test import TestCase
from django.contrib.auth.models import User

from register.serializers import RegistrationSerializer

class RegistrationSerializerTests(TestCase):
    def setUp(self):
        self.user_attributes = { 'username': 'account', 'password': 'accountPassword' }
        self.user = User.objects.create(**self.user_attributes)
        self.serializer = RegistrationSerializer(instance=self.user)
        self.data = self.serializer.data

    def test_contains_expected_fields(self):
        """
        Check if the serializer contains the fields that are expected.
        """
        self.assertEqual(self.data.keys(), set(['id', 'username', 'password']))

    def test_username_field_content(self):
        self.assertEqual(self.data['username'], self.user_attributes['username'])

    def test_password_field_content(self):
        self.assertEqual(self.data['password'], self.user_attributes['password'])

    def test_create_method(self):
        """
        Method should return the username of the newly created user
        """
        attributes = { 'username': 'TestUsername', 'password': 'TestPassword' }
        created_user = RegistrationSerializer().create(attributes)

        self.assertEqual(User(**attributes).username, created_user.username)
