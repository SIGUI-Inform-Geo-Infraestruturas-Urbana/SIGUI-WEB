# Generated by Django 4.0.6 on 2022-07-28 22:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_maps', '0015_geodadosespaciais_namefile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='geodadosespaciais',
            name='namefile',
        ),
    ]
