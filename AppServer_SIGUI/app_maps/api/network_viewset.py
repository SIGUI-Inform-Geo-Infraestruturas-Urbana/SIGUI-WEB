import os
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import * #FederativeUnitSerializer, InfrastructureSerializer,FileSerealizer, GeoDadosEspaciaisSerializer, CountySerializer, DistrictSerializer
from app_maps import models

class NetworkViewSet(viewsets.ModelViewSet):
    serializer_class = NetworkSerializer

    def get_queryset(self):
        queryset = models.Network.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        espatial_request = request.data
        id_subsystem=espatial_request["net_subsystems"]
        subsystem = None
        if  id_subsystem != None:
            subsObjectId=id_subsystem["id"]
            subsystem = models.Subsystems.objects.get(id=subsObjectId)

        ####new_geoEspatial = CountySerializer(data = espatial_request)

        new_geoEspatial = models.Network.objects.create(net_name=espatial_request["net_name"],
        net_category=espatial_request["net_category"],net_status=espatial_request["net_status"],
        net_subsystems=subsystem)
      
        new_geoEspatial.save()

        serializer = NetworkSerializer(new_geoEspatial)

        return Response(serializer.data)