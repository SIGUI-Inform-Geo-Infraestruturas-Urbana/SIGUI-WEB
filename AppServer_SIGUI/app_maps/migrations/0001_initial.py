# Generated by Django 4.0.4 on 2022-06-19 23:00

import app_maps.models
import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='County',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('co_name', models.CharField(blank=True, max_length=254, null=True)),
                ('co_initials_uf', models.CharField(blank=True, max_length=250, null=True)),
                ('co_name_ugrhi', models.CharField(blank=True, max_length=254, null=True)),
                ('co_number_ugrhi', models.IntegerField(blank=True, null=True)),
                ('co_cod_environmental', models.IntegerField(blank=True, null=True)),
                ('co_area_county', models.FloatField(blank=True, null=True)),
                ('geometry', django.contrib.gis.db.models.fields.MultiPolygonField(blank=True, null=True, srid=4326)),
            ],
        ),
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('dc_name', models.CharField(blank=True, max_length=254, null=True)),
                ('dc_area', models.FloatField(blank=True, null=True)),
                ('geometry', django.contrib.gis.db.models.fields.MultiPolygonField(blank=True, null=True, srid=4326)),
                ('dc_county', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.county')),
            ],
        ),
        migrations.CreateModel(
            name='Equipament',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('eq_model', models.CharField(blank=True, max_length=254, null=True)),
                ('eq_representation', models.CharField(blank=True, max_length=254, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='EquipamentInfrastructure',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('eq_infra_serial_number', models.IntegerField(blank=True, null=True)),
                ('eq_infra_representation', models.CharField(blank=True, max_length=254, null=True)),
                ('eq_infra_status', models.IntegerField(blank=True, null=True)),
                ('eq_infra_equipament', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.equipament')),
            ],
        ),
        migrations.CreateModel(
            name='EquipamentInfrastructureNetwork',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('eq_infra_net_serial_number', models.IntegerField(blank=True, null=True)),
                ('eq_infra_net_representation', models.CharField(blank=True, max_length=254, null=True)),
                ('eq_infra_net_status', models.CharField(blank=True, max_length=254, null=True)),
                ('eq_infra_net_equipament', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.equipament')),
            ],
        ),
        migrations.CreateModel(
            name='FederativeUnit',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('uf_name', models.CharField(blank=True, max_length=254, null=True)),
                ('uf_initials', models.CharField(blank=True, max_length=250, null=True)),
                ('uf_name_region', models.CharField(blank=True, max_length=250, null=True)),
                ('uf_area_state', models.FloatField(blank=True, null=True)),
                ('geometry', django.contrib.gis.db.models.fields.MultiPolygonField(blank=True, null=True, srid=4326)),
            ],
        ),
        migrations.CreateModel(
            name='GeoDadosEspaciais',
            fields=[
                ('id_espatial', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('file', models.ImageField(blank=True, null=True, upload_to=app_maps.models.upload_file_espatial)),
                ('fileupload', models.FileField(blank=True, null=True, upload_to=app_maps.models.upload_file_espatial)),
                ('file_dbf', models.FileField(blank=True, null=True, upload_to=app_maps.models.upload_file_espatial)),
                ('file_prj', models.FileField(blank=True, null=True, upload_to=app_maps.models.upload_file_espatial)),
                ('file_qpj', models.FileField(blank=True, null=True, upload_to=app_maps.models.upload_file_espatial)),
                ('file_cpg', models.FileField(blank=True, null=True, upload_to=app_maps.models.upload_file_espatial)),
                ('file_shp', models.FileField(blank=True, null=True, upload_to=app_maps.models.upload_file_espatial)),
                ('file_shx', models.FileField(blank=True, null=True, upload_to=app_maps.models.upload_file_espatial)),
            ],
        ),
        migrations.CreateModel(
            name='Infrastructure',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('infra_name', models.CharField(blank=True, max_length=254, null=True)),
                ('infra_category', models.CharField(blank=True, max_length=254, null=True)),
                ('geometry', django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326)),
                ('infra_dependent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='dependent', to='app_maps.infrastructure')),
                ('infra_equipaments', models.ManyToManyField(through='app_maps.EquipamentInfrastructure', to='app_maps.equipament')),
            ],
        ),
        migrations.CreateModel(
            name='Manufacturer',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('mfr_name', models.CharField(blank=True, max_length=254, null=True)),
                ('mfr_cnpj', models.CharField(blank=True, max_length=254, null=True)),
                ('mfr_andress', models.CharField(blank=True, max_length=254, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Provider',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('p_name', models.CharField(max_length=254)),
                ('p_description', models.CharField(max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='Subsystems',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('ss_name', models.CharField(max_length=254)),
                ('ss_description', models.CharField(max_length=254)),
                ('ss_category', models.CharField(max_length=254)),
                ('co_provider', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_maps.provider')),
                ('ss_county', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_maps.county')),
            ],
        ),
        migrations.CreateModel(
            name='Street',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('st_cod_key', models.CharField(blank=True, max_length=15, null=True)),
                ('st_status', models.CharField(blank=True, max_length=100, null=True)),
                ('st_name_street', models.CharField(blank=True, max_length=254, null=True)),
                ('st_name_street_pre', models.CharField(blank=True, max_length=254, null=True)),
                ('st_type_street', models.CharField(blank=True, max_length=254, null=True)),
                ('st_type_legislation', models.CharField(blank=True, max_length=254, null=True)),
                ('st_district_e', models.CharField(blank=True, max_length=254, null=True)),
                ('st_district_d', models.CharField(blank=True, max_length=254, null=True)),
                ('st_zip_code_e', models.CharField(blank=True, max_length=254, null=True)),
                ('st_zip_code_d', models.CharField(blank=True, max_length=254, null=True)),
                ('geometry', django.contrib.gis.db.models.fields.LineStringField(blank=True, null=True, srid=4326)),
                ('st_district', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.district')),
            ],
        ),
        migrations.CreateModel(
            name='PublicPlace',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('pp_cod_sector', models.IntegerField(blank=True, null=True)),
                ('pp_cod_block', models.IntegerField(blank=True, null=True)),
                ('pp_cod_face', models.IntegerField(blank=True, null=True)),
                ('pp_total_residences', models.IntegerField(blank=True, null=True)),
                ('pp_total_general', models.IntegerField(blank=True, null=True)),
                ('geometry', django.contrib.gis.db.models.fields.LineStringField(blank=True, null=True, srid=4326)),
                ('pp_district', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.district')),
                ('pp_streat', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.street')),
            ],
        ),
        migrations.CreateModel(
            name='Network',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('net_name', models.CharField(blank=True, max_length=254, null=True)),
                ('net_category', models.CharField(blank=True, max_length=254, null=True)),
                ('net_status', models.CharField(blank=True, max_length=254, null=True)),
                ('net_subsystems', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.subsystems')),
            ],
        ),
        migrations.CreateModel(
            name='InfrastructureNetwork',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('infra_net_serial_number', models.IntegerField(blank=True, null=True)),
                ('infra_net_representation', models.CharField(blank=True, max_length=254, null=True)),
                ('infra_net_status', models.CharField(blank=True, max_length=254, null=True)),
                ('geometry', django.contrib.gis.db.models.fields.LineStringField(blank=True, null=True, srid=4326)),
                ('infra_net_equipament', models.ManyToManyField(through='app_maps.EquipamentInfrastructureNetwork', to='app_maps.equipament')),
                ('infra_net_infrastructure_in', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='infraestructure_in', to='app_maps.infrastructure')),
                ('infra_net_infrastructure_out', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='infraestructure_out', to='app_maps.infrastructure')),
                ('infra_net_network', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.network')),
            ],
        ),
        migrations.AddField(
            model_name='infrastructure',
            name='infra_network',
            field=models.ManyToManyField(related_name='network', through='app_maps.InfrastructureNetwork', to='app_maps.infrastructure'),
        ),
        migrations.AddField(
            model_name='infrastructure',
            name='infra_subsystems',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.subsystems'),
        ),
        migrations.AddField(
            model_name='equipamentinfrastructurenetwork',
            name='eq_infra_net_infrastructure',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.infrastructurenetwork'),
        ),
        migrations.AddField(
            model_name='equipamentinfrastructurenetwork',
            name='eq_infra_net_subsystem',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.subsystems'),
        ),
        migrations.AddField(
            model_name='equipamentinfrastructure',
            name='eq_infra_infrastructure',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.infrastructure'),
        ),
        migrations.AddField(
            model_name='equipamentinfrastructure',
            name='eq_infra_subsystem',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.subsystems'),
        ),
        migrations.CreateModel(
            name='EquipamentCounty',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('eq_co_cod', models.FloatField(blank=True, null=True)),
                ('eq_co_equipament', models.CharField(blank=True, max_length=150, null=True)),
                ('eq_co_type', models.CharField(blank=True, max_length=150, null=True)),
                ('eq_co_departament_admin', models.CharField(blank=True, max_length=60, null=True)),
                ('eq_co_name_complete', models.CharField(blank=True, max_length=254, null=True)),
                ('eq_co_first_name', models.CharField(blank=True, max_length=150, null=True)),
                ('eq_co_name', models.CharField(blank=True, max_length=150, null=True)),
                ('eq_co_name_map', models.CharField(blank=True, max_length=111, null=True)),
                ('eq_co_number_building', models.CharField(blank=True, max_length=15, null=True)),
                ('eq_co_observation', models.CharField(blank=True, max_length=254, null=True)),
                ('eq_co_cod_maintainer', models.IntegerField(blank=True, null=True)),
                ('geometry', django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326)),
                ('eq_co_district', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.district')),
                ('eq_co_public_place', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.publicplace')),
                ('eq_co_street', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.street')),
            ],
        ),
        migrations.AddField(
            model_name='equipament',
            name='eq_manufacturer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.manufacturer'),
        ),
        migrations.AddField(
            model_name='county',
            name='co_unit_federal',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_maps.federativeunit'),
        ),
    ]
