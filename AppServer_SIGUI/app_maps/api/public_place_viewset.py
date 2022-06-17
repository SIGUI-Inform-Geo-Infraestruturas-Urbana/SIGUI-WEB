import os
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import * #FederativeUnitSerializer, InfrastructureSerializer,FileSerealizer, GeoDadosEspaciaisSerializer, CountySerializer, DistrictSerializer
from app_maps import models

class PublicPlaceViewSet(viewsets.ModelViewSet):
    serializer_class = PublicPlaceSerializer
    queryset = models.PublicPlace.objects.all()