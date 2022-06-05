from ast import Return
from dataclasses import fields
from pyexpat import model
from statistics import mode
from typing import ValuesView
from rest_framework import serializers 
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from django.core.serializers import serialize

from app_maps import models

# class LayersSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Layers
#         fields = '__all__'

class EquipamentSerializer(serializers.Serializer):
    value = serializers.CharField(max_length=80)
    viewValue = serializers.CharField(max_length=80)

    def create(self, validated_data):
        return models.Equipament.objects.create(**validated_data)

# class EquipamentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Equipament
#         fields = '__all__'

class InfraestructureSerializer(GeoFeatureModelSerializer):
    def serializer():
        serialize('geojson',models.Infrastructure.objects.all(),
                geometry_field='position',fields=('nomeInfraestructure',))

class InfraestruturaSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.Infrastructure
        fields = '__all__'
        geo_field = 'position'


class StateSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.State
        fields = ['id_state','name_state','cod_uf','initials_uf','nome_region',  
            'area_state']
        geo_field = 'geometry'

class CountySerializer(GeoFeatureModelSerializer):
    # state = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = models.County
        fields = ['id_County','cod_ibge','name_county','initials_uf','name_ugrhi',  
            'number_ugrhi','cod_environmental','id_state','area_county']
        geo_field = 'geometry'

    # def create(self, validated_data):
    #     #item = []
    #     #item = validated_data.pop('name_county')
    #     print('TESRTTRTT')
    #    # print(item)
    #     print('AAAAAAAAA')
    #     stateEntity = models.State.objects.get(id_state=1)
    #     county = models.County.objects.create(id_state = stateEntity)   
    #     return county
    #     #return super().create(validated_data)

    
    # def create(self, validated_data):
    #     item = []
    #     item = validated_data.pop('id_state')
    #     print('TESRTTRTT')
    #     print(item)
    #     print('AAAAAAAAA')
    #     print(item.id_state)
    #     stateEntity = models.State.objects.get(id_state=item.id_state)
    #     county = models.County.objects.create(id_state = stateEntity)   
    #     return county
    #     #return super().create(validated_data)

class DistrictSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.District
        fields = ['id_district','nome_district','area_district','id_County']
        geo_field = 'geometry'

class FileSerealizer (serializers.Serializer):
    file = serializers.FileField(max_length=None, allow_empty_file=False)

class GeoDadosEspaciaisSerializer (serializers.ModelSerializer):
    class Meta:
        model = models.GeoDadosEspaciais
        fields = '__all__'