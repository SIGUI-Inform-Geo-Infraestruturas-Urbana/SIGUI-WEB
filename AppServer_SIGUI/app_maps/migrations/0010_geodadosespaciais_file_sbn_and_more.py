# Generated by Django 4.0.6 on 2022-07-27 19:39

import app_maps.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_maps', '0009_publicplace_pp_name_seg_log_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='geodadosespaciais',
            name='file_sbn',
            field=models.FileField(blank=True, null=True, upload_to=app_maps.models.upload_file_espatial),
        ),
        migrations.AddField(
            model_name='geodadosespaciais',
            name='file_sbx',
            field=models.FileField(blank=True, null=True, upload_to=app_maps.models.upload_file_espatial),
        ),
    ]
