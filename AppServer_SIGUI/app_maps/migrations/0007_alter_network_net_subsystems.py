# Generated by Django 4.0.4 on 2022-06-24 15:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_maps', '0006_alter_network_net_subsystems'),
    ]

    operations = [
        migrations.AlterField(
            model_name='network',
            name='net_subsystems',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.subsystems'),
        ),
    ]
