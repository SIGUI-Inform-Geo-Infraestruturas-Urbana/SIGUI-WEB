# Generated by Django 4.0.4 on 2022-05-24 16:46

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_maps', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='municipio',
            name='geometry',
            field=django.contrib.gis.db.models.fields.MultiPolygonField(blank=True, null=True, srid=4326),
        ),
    ]
