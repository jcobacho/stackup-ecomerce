# Generated by Django 4.2 on 2024-10-06 02:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authapi', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_seller',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_shopper',
            field=models.BooleanField(default=False),
        ),
    ]