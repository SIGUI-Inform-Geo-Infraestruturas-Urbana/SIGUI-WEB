import os
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import * #FederativeUnitSerializer, InfrastructureSerializer,FileSerealizer, GeoDadosEspaciaisSerializer, CountySerializer, DistrictSerializer
from app_maps import models

class PublicPlaceViewSet(viewsets.ModelViewSet):
    serializer_class = PublicPlaceSerializer
    queryset = models.PublicPlace.objects.all()

    def get_queryset(self):
        queryset = models.PublicPlace.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        espatial_request = request.data
        id_infra=espatial_request["pp_streat"]
        infraD = None
        if id_infra != None:
            infraObjectId=id_infra["id"]
            infraD = models.Street.objects.get(id=infraObjectId)

        id_subsystem=espatial_request["pp_district"]
        subsObjectId=id_subsystem["id"]
        subsystem = models.District.objects.get(id=subsObjectId)

        ####new_geoEspatial = CountySerializer(data = espatial_request)

        new_geoEspatial = models.PublicPlace.objects.create(pp_cod_sector=espatial_request["pp_cod_sector"],
        pp_cod_block=espatial_request["pp_cod_block"], pp_cod_face=espatial_request["pp_cod_face"], 
        pp_total_residences=espatial_request["pp_total_residences"],pp_total_general=espatial_request["pp_total_general"],
        pp_streat=infraD,pp_district=subsystem,
        geometry=espatial_request["geometry"])
      
        new_geoEspatial.save()

        serializer = PublicPlaceSerializer(new_geoEspatial)

        return Response(serializer.data)