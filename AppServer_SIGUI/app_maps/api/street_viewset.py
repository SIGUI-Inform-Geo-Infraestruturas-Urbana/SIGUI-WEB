import os
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import * #FederativeUnitSerializer, InfrastructureSerializer,FileSerealizer, GeoDadosEspaciaisSerializer, CountySerializer, DistrictSerializer
from app_maps import models

class StreetViewSet(viewsets.ModelViewSet):
   serializer_class = StreetSerializer

def get_queryset(self):
        queryset = models.Street.objects.all()
        return queryset

