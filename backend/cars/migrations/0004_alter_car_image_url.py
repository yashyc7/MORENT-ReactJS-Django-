# Generated by Django 5.1 on 2024-09-03 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0003_alter_car_image_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='image_url',
            field=models.FileField(upload_to=''),
        ),
    ]
