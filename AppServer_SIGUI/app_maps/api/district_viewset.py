import os
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import * #FederativeUnitSerializer, InfrastructureSerializer,FileSerealizer, GeoDadosEspaciaisSerializer, CountySerializer, DistrictSerializer
from app_maps import models

class DistrictViewSet(viewsets.ModelViewSet):
    serializer_class = DistrictSerializer

    def get_queryset(self):
        queryset = models.District.objects.all()
        return queryset
    
    def retrieve(self, request, *args, **kwargs):
       params = kwargs 
       print( params['pk'])
       objects = models.District.objects.filter(id=params['pk']) 
       serializer = DistrictSerializer(objects, many= True)
       return Response((serializer.data))

    def create(self, request, *args, **kwargs):
        try:
            espatial_request = request.data
            print(espatial_request)

            write_serializer = DistrictSerializer(data=espatial_request)
            if write_serializer.is_valid():
                write_serializer.save()
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
    #     id_county=espatial_request["dc_county"]
    #     countyObjectId=id_county["id"]
    #     county = models.County.objects.get(id=countyObjectId)

    #     ####new_geoEspatial = CountySerializer(data = espatial_request)

    #     new_geoEspatial = models.District.objects.create(dc_name=espatial_request["dc_name"],
    #     dc_area=espatial_request["dc_area"],dc_county=county,
    #     geometry=espatial_request["geometry"])
      
    #     new_geoEspatial.save()

    #     serializer = DistrictSerializer(new_geoEspatial)

    #     return Response(serializer.data)