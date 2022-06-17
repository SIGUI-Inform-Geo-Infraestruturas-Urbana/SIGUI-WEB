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

def create(self, request, *args, **kwargs):
        espatial_request = request.data
        id_district=espatial_request["st_district"]
        districtObjectId=id_district["id"]
        district = models.District.objects.get(id=districtObjectId)

        ####new_geoEspatial = CountySerializer(data = espatial_request)

        new_geoEspatial = models.District.objects.create(st_cod_key=espatial_request["st_cod_key"],
        st_status=espatial_request["st_status"],st_name_street_pre=espatial_request["st_name_street_pre"],st_type_street=espatial_request["st_type_street"],
        st_type_legislation=espatial_request["st_type_legislation"],st_district_e=espatial_request["st_district_e"],st_district_d=espatial_request["st_district_d"],
        st_zip_code_e=espatial_request["st_zip_code_e"],st_zip_code_d=espatial_request["st_zip_code_d"],st_district=district,
        geometry=espatial_request["geometry"]) 
      
        new_geoEspatial.save()

        serializer = DistrictSerializer(new_geoEspatial)

        return Response(serializer.data)