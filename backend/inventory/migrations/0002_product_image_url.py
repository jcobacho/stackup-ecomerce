# Generated by Django 4.2 on 2024-10-03 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image_url',
            field=models.TextField(blank=True, null=True),
        ),
    ]