import os
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import * #FederativeUnitSerializer, InfrastructureSerializer,FileSerealizer, GeoDadosEspaciaisSerializer, CountySerializer, DistrictSerializer
from app_maps import models

class CountyViewSet(viewsets.ModelViewSet):
    serializer_class = CountySerializer

    # def retrieve(self, request, pk=None):
    #     instance = self.get_object()
    #     return Response(self.serializer_class(instance).data, status=status.HTTP_200_OK)

    def get_queryset(self):

        # a = self.request.query_params.get('county_id',None)
        queryset = ''
        ##countyId = self.kwargs.get('county_id')
        # if countyId != None:
        #     county = models.County.objects.filter(id_County=countyId)
        #     print(county)
        # else:
        queryset = models.County.objects.all()
        # if 'pk' in self.kwargs:
        #     return models.County.objects.filter(id_County=self.kwargs['pk'])     

        return queryset

    def create(self, request, *args, **kwargs):
        espatial_request = request.data

        id_state=espatial_request["co_unit_federal"]
        test=id_state["id"]
        stateEntity = models.FederativeUnit.objects.get(id=test)

        new_geoEspatial = models.County.objects.create(co_name=espatial_request["co_name"],
        co_initials_uf=espatial_request["co_initials_uf"],co_name_ugrhi=espatial_request["co_name_ugrhi"],
        co_number_ugrhi=espatial_request["co_number_ugrhi"],co_cod_environmental=espatial_request["co_cod_environmental"],
        co_unit_federal=stateEntity,co_area_county=espatial_request["co_area_county"],
        geometry=espatial_request["geometry"])

        new_geoEspatial.save()

        serializer = CountySerializer(new_geoEspatial)

        return Response(serializer.data)


    # def create(self, request, *args, **kwargs):
    #     espatial_request = request.data
    #     print(request.data)
    #     id_state=espatial_request["co_unit_federal"]
    #     test=id_state["id"]
    #     #stateEntity = models.FederativeUnit.objects.get(id=test)
        
    #     new_geoEspatial = CountySerializer(request.data)
        
    #     return Response(new_geoEspatial.validated_data)
    #     #print(new_geoEspatial)

    #     # if new_geoEspatial.is_valid():
    #     #     valueR = new_geoEspatial.save()
    #     #     print('Passou!')
    #     #     return Response(valueR.data)
    #     # else: 
    #     #     print('Não deu certo!')
    #     #     return Response(new_geoEspatial.errors, status=status.HTTP_400_BAD_REQUEST)

    #     # new_geoEspatial = models.County.objects.create(co_name=espatial_request["co_name"],
    #     # co_initials_uf=espatial_request["co_initials_uf"],co_name_ugrhi=espatial_request["co_name_ugrhi"],
    #     # co_number_ugrhi=espatial_request["co_number_ugrhi"],co_cod_environmental=espatial_request["co_cod_environmental"],
    #     # co_unit_federal=stateEntity,co_area_county=espatial_request["co_area_county"],
    #     # geometry=espatial_request["geometry"])
      
    #    # new_geoEspatial.save()
    #     # if new_geoEspatial.is_valid():
    #     #     new_geoEspatial.save()
    #     #     print('Passou!')
    #     # else: 
    #     #     print('Não deu certo!')

    #     #serializer = CountySerializer(new_geoEspatial)

        