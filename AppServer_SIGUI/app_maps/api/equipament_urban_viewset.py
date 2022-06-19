import os
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import * #FederativeUnitSerializer, InfrastructureSerializer,FileSerealizer, GeoDadosEspaciaisSerializer, CountySerializer, DistrictSerializer
from app_maps import models

class EquipamentUrbanViewSet(viewsets.ModelViewSet):
    serializer_class = EquipamentCountySerializer
    queryset = models.EquipamentCounty.objects.all()

    def get_queryset(self):
        queryset = models.EquipamentCounty.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        espatial_request = request.data
        id_infra=espatial_request["eq_co_street"]
        stretId = None
        if id_infra != None:
            infraObjectId=id_infra["id"]
            stretId = models.Street.objects.get(id=infraObjectId)

        id_dist=espatial_request["eq_co_district"]
        ditObjectId=id_dist["id"]
        ddID = models.District.objects.get(id=ditObjectId)

        id_pp=espatial_request["eq_co_public_place"]
        ppObjectId=id_pp["id"]
        ppID = models.PublicPlace.objects.get(id=ppObjectId)

        ####new_geoEspatial = CountySerializer(data = espatial_request)

        new_geoEspatial = models.EquipamentCounty.objects.create(eq_co_cod=espatial_request["eq_co_cod"],
        eq_co_equipament=espatial_request["eq_co_equipament"], eq_co_type=espatial_request["eq_co_type"], 
        eq_co_departament_admin=espatial_request["eq_co_departament_admin"],eq_co_name_complete=espatial_request["eq_co_name_complete"],
        eq_co_first_name=espatial_request["eq_co_first_name"],eq_co_name=espatial_request["eq_co_name"],
        eq_co_name_map=espatial_request["eq_co_name_map"],eq_co_number_building=espatial_request["eq_co_number_building"],
        eq_co_observation=espatial_request["eq_co_observation"],#,eq_co_cod_maintainer=espatial_request["eq_co_cod_maintainer"]
        eq_co_street=stretId,eq_co_public_place=ppID,eq_co_district=ddID,
        geometry=espatial_request["geometry"])
      
        new_geoEspatial.save()

        serializer = EquipamentCountySerializer(new_geoEspatial)

        return Response(serializer.data)