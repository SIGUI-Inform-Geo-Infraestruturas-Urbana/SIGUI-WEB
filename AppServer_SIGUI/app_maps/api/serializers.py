from rest_framework import serializers 
from app_maps import models

class LayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Layers
        fields = '__all__'

