import os
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import * #FederativeUnitSerializer, InfrastructureSerializer,FileSerealizer, GeoDadosEspaciaisSerializer, CountySerializer, DistrictSerializer
from app_maps import models

class InfraestruturaNetworkViewSet(viewsets.ModelViewSet):
    serializer_class = InfrastructureNetworkSerializer

    def get_queryset(self):
        queryset = models.InfrastructureNetwork.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        try:
            espatial_request = request.data
            print(espatial_request)

            write_serializer = InfrastructureNetworkSerializer(data=espatial_request)
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