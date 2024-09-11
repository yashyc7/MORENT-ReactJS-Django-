# Generated by Django 4.2.11 on 2024-09-11 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0005_alter_car_image_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='location',
            field=models.CharField(blank=True, choices=[('New York', 'New York'), ('Los Angeles', 'Los Angeles'), ('Chicago', 'Chicago'), ('San francisco', 'San Francisco')], default='New York', max_length=15, null=True),
        ),
    ]
