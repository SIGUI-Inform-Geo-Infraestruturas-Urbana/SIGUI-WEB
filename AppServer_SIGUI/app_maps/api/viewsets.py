from rest_framework import viewsets 
from app_maps.api import serializers
from app_maps import models
class LayersViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.LayersSerializer
    queryset = models.Layers.objects.all()