import os
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import * #FederativeUnitSerializer, InfrastructureSerializer,FileSerealizer, GeoDadosEspaciaisSerializer, CountySerializer, DistrictSerializer
from app_maps import models
class GeoDadosEspaciaisViewSet(viewsets.ModelViewSet):
    serializer_class = GeoDadosEspaciaisSerializer

    def retrieve(self, request, pk=None):
        instance = self.get_object()
        return Response(self.serializer_class(instance).data, status=status.HTTP_200_OK)

    def get_queryset(self):
        queryset = models.GeoDadosEspaciais.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        espatial_request = request.data
        print(espatial_request)
        # return Response('aaaaa') 
        #queryset = User.objects.get(username='responsavel')
        write_serializer = GeoDadosEspaciaisSerializer(data=espatial_request)
        if write_serializer.is_valid():
            files = write_serializer.save()
            # conversionParser(new_geoEspatial.file_shp)
            if espatial_request["category"] == 'county':
                #a = write_serializer.parserShapFile()
                files.parserShapFile()
                print('cidade')
            elif espatial_request["category"] == 'state':
                a = files.parserShapFileState()
                print(a)
                print('estados')
            elif espatial_request["category"] == 'district':
                a = files.parserShapFileDistrict()
                print(a)
                print('district')
            elif espatial_request["category"] == 'street':
                a = files.parserShapFileStreet()
                print(a)
                print('street')
            elif espatial_request["category"] == 'publicplace':
                a = files.parserShapFilePublicPlace()
               # print(a)
                #files.conversionParser()
                print('estados')
            elif espatial_request["category"] == 'equipament':
                a = files.parserShapFileEquipament()
                print(a)
                print('equipament')
            print('Passou!')
            # print(a.net_name)
            serializer = GeoDadosEspaciaisSerializer(write_serializer)

            return Response('serializer.data')
            #return Response('aaaaa') # Response(write_serializer.data)
        else: 
            print('Não deu certo!')
            print(write_serializer.data)
            print(write_serializer.errors)
            return Response(write_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
