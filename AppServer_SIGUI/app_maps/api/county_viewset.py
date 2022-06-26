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
        queryset = ''
        queryset = models.County.objects.all()
        return queryset


    def create(self, request, *args, **kwargs):
        try:
            espatial_request = request.data
            print(espatial_request)

            write_serializer = CountySerializer(data=espatial_request)
            if write_serializer.is_valid():
                a = write_serializer.save()
                print(write_serializer.data)
                print(write_serializer.errors)
                print('Passou!')
                # print(a.net_name)
                return Response(write_serializer.data)
            else: 
                print('Não deu certo!')
                print(write_serializer.data)
                print(write_serializer.errors)
                return Response(write_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
             return Response(write_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

        
