from dataclasses import fields
from pyexpat import model
from typing import ValuesView
from rest_framework import serializers 
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

