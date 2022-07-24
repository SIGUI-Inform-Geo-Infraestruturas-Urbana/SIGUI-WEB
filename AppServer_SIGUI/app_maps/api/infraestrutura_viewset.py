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

    def retrieve(self, request, *args, **kwargs):
       params = kwargs 
       print( params['pk'])
       objects = models.Infrastructure.objects.filter(id=params['pk']) 
       serializer = InfrastructureSerializer(objects, many= True)
       return Response((serializer.data))

    def create(self, request, *args, **kwargs):
        try:
            espatial_request = request.data
            print(espatial_request)

            write_serializer = InfrastructureSerializer(data=espatial_request)
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