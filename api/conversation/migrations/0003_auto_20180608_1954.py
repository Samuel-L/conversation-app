# Generated by Django 2.0.6 on 2018-06-08 19:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('conversation', '0002_auto_20180608_1855'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='sent_to',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='sent_to', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='message',
            name='sent_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_by', to=settings.AUTH_USER_MODEL),
        ),
    ]