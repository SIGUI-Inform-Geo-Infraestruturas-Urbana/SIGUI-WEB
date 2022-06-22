import os
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import * #FederativeUnitSerializer, InfrastructureSerializer,FileSerealizer, GeoDadosEspaciaisSerializer, CountySerializer, DistrictSerializer
from app_maps import models

class InfraestruturaViewSet(viewsets.ModelViewSet):
    serializer_class = InfrastructureSerializer

    def get_queryset(self):
        queryset = models.Infrastructure.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        espatial_request = request.data
        id_infra=espatial_request["infra_dependent"]
        infraD = None
        if id_infra != None:
            infraObjectId=id_infra["id"]
            infraD = models.Infrastructure.objects.get(id=infraObjectId)

        subsystem = None
        id_subs=espatial_request["infra_subsystems"]
        if id_subs != None:
            subsObjectId=id_subs["id"]
            subsystem = models.Subsystems.objects.get(id=subsObjectId)

        street = None
        id_street=espatial_request["infra_street"]
        if id_subs != None:
            setreObjectId=id_street["id"]
            street = models.Street.objects.get(id=setreObjectId)

        geom = None
        id_street=espatial_request["geometry"]
        if id_street == '0':
            geom = None
        else: 
            geom = espatial_request["geometry"]
       
        ####new_geoEspatial = CountySerializer(data = espatial_request)//infra_street

        new_geoEspatial = models.Infrastructure.objects.create(infra_name=espatial_request["infra_name"],
        infra_category=espatial_request["infra_category"],infra_dependent=infraD,infra_subsystems=subsystem,
        infra_street=street,geometry=geom)
      
        new_geoEspatial.save()

        serializer = InfrastructureSerializer(new_geoEspatial)

        return Response(serializer.data)