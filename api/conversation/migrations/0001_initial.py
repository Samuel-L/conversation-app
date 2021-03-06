# Generated by Django 2.0.6 on 2018-06-08 16:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField()),
                ('is_archived', models.BooleanField(default=False)),
                ('topic', models.CharField(max_length=255)),
                ('user_a', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_a', to=settings.AUTH_USER_MODEL)),
                ('user_b', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_b', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
