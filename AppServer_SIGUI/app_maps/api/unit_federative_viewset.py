import os
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import * #FederativeUnitSerializer, InfrastructureSerializer,FileSerealizer, GeoDadosEspaciaisSerializer, CountySerializer, DistrictSerializer
from app_maps import models

class UnitFederativeViewset(viewsets.ModelViewSet):
    serializer_class = FederativeUnitSerializer

    def retrieve(self, request, pk=None):
        instance = self.get_object()
        return Response(self.serializer_class(instance).data, status=status.HTTP_200_OK)

    def get_queryset(self):
        queryset = models.FederativeUnit.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        espatial_request = request.data

        ####new_geoEspatial = CountySerializer(data = espatial_request) //uf_geocode

        new_geoEspatial = models.FederativeUnit.objects.create(uf_name=espatial_request["uf_name"],
        uf_geocode=espatial_request["uf_geocode"],uf_initials=espatial_request["uf_initials"],uf_name_region=espatial_request["uf_name_region"],
        uf_area_state=espatial_request["uf_area_state"],geometry=espatial_request["geometry"])
      
        new_geoEspatial.save()

        serializer = FederativeUnitSerializer(new_geoEspatial)

        return Response(serializer.data)



