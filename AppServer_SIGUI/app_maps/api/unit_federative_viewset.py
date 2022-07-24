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

    def retrieve(self, request, *args, **kwargs):
       params = kwargs 
       print( params['pk'])
       objects = models.FederativeUnit.objects.filter(id=params['pk']) 
       serializer = FederativeUnitSerializer(objects, many= True)
       return Response((serializer.data))

    def create(self, request, *args, **kwargs):
        espatial_request = request.data
        print(espatial_request)

        write_serializer = FederativeUnitSerializer(data=espatial_request)
        if write_serializer.is_valid():
            a = write_serializer.save()
            print(write_serializer.data)
            print(write_serializer.errors)
            print('Passou!')
            print(a.net_name)
            #serializer = NetworkSerializer(write_serializer)
            #print(serializer)
            return Response(write_serializer.data)
        else: 
            print('Não deu certo!')
            print(write_serializer.data)
            print(write_serializer.errors)
            return Response(write_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




