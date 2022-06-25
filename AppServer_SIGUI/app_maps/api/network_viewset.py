from functools import partial
import os
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import * #FederativeUnitSerializer, InfrastructureSerializer,FileSerealizer, GeoDadosEspaciaisSerializer, CountySerializer, DistrictSerializer
from app_maps import models

class NetworkViewSet(viewsets.ModelViewSet):
    serializer_class = NetworkSerializer

    def get_queryset(self):
        queryset = models.Network.objects.all()
        return queryset

    # def create(self, request, *args, **kwargs):
    #     espatial_request = request.data
    #     id_subsystem=espatial_request["net_subsystems"]
    #     subsystem = None
    #     if  id_subsystem != None:
    #         subsObjectId=id_subsystem["id"]
    #         subsystem = models.Subsystems.objects.get(id=subsObjectId)

    #     ####new_geoEspatial = CountySerializer(data = espatial_request)

    #     new_geoEspatial = models.Network.objects.create(net_name=espatial_request["net_name"],
    #     net_category=espatial_request["net_category"],net_status=espatial_request["net_status"],
    #     net_subsystems=subsystem)
      
    #     new_geoEspatial.save()

    #     serializer = NetworkSerializer(new_geoEspatial)

    #     return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        espatial_request = request.data
        #print(espatial_request)
        #id_state=espatial_request["net_subsystems"]["id"]       
        #espatial_request["net_subsystems"] = #models.Subsystems.objects.get(id=id_state)
        print(espatial_request)

        # obje = models.Subsystems.objects.get(id=espatial_request["net_subsystems"]['id'])
        # espatial_request["net_subsystems"] = obje.id
        # print('stateEntity')
        # print(espatial_request["net_subsystems"])

        write_serializer = NetworkSerializer(data=espatial_request)
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

