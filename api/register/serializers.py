from rest_framework import serializers
from django.contrib.auth.models import User

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')

    def create(self, validated_data):
        """
        Override create method in ModelSerializer to create new user
        using the validated_data.
        """
        user = User.objects.create_user(**validated_data)
        return user
