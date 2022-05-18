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
