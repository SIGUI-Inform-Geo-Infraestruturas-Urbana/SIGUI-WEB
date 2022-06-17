import os
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import * #FederativeUnitSerializer, InfrastructureSerializer,FileSerealizer, GeoDadosEspaciaisSerializer, CountySerializer, DistrictSerializer
from app_maps import models

class SubsystemViewSet(viewsets.ModelViewSet):
    serializer_class = SubsystemsSerializer

    def get_queryset(self):
        queryset = models.Subsystems.objects.all()
        return queryset

    # def create(self, request, *args, **kwargs):
    #     espatial_request = request.data
    #     id_county=espatial_request["ss_county"]
    #     ObjectId=id_county["id"]
    #     county = models.Infrastructure.objects.get(id=ObjectId)

    #     id_provider=espatial_request["co_provider"]
    #     proviObjectId=id_provider["id"]
    #     provider = models.Infrastructure.objects.get(id=proviObjectId)

    #     ####new_geoEspatial = CountySerializer(data = espatial_request)

    #     new_geoEspatial = models.Infrastructure.objects.create(ss_name=espatial_request["ss_name"],
    #     ss_description=espatial_request["ss_description"],ss_category=espatial_request["ss_category"],co_provider=provider,ss_county=county,
    #     geometry=espatial_request["geometry"])
      
    #     new_geoEspatial.save()

    #     serializer = InfrastructureSerializer(new_geoEspatial)

    #     return Response(serializer.data)