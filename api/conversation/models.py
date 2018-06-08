from django.db import models
from django.contrib.auth.models import User

class Conversation(models.Model):
    user_a = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_a')
    user_b = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_b')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_archived = models.BooleanField(default=False)
    topic = models.CharField(max_length=255)

    class Meta:
        # The prefix "-" means "Order by this field in descending order".
        # Default (without prefix) is ascending.
        ordering = ('-updated_at',)

    def __str__(self):
        return u'{0} - {1}/{2}'.format(self.topic, self.user_a, self.user_b)
