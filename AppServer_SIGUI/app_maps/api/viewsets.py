# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import authentication, permissions
# from django.contrib.auth.models import User

# class LayersViewSet(APIView):
#     def get(self, request, format = None):
#         # usernames = [user.username for user in User.objects.all()]
#         return "aaaaaa"#Response(usernames)

import os
from crypt import methods
from tabnanny import verbose
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from django.contrib.gis.gdal import DataSource
from django.contrib.gis.utils import LayerMapping
from rest_framework.decorators import action
#from django.contrib.gis.gdal import DataSource
from yaml import serialize 
from .serializers import * #FederativeUnitSerializer, InfrastructureSerializer,FileSerealizer, GeoDadosEspaciaisSerializer, CountySerializer, DistrictSerializer
from app_maps import models

# class LayersViewSet(viewsets.ModelViewSet):
#     serializer_class = serializers.LayersSerializer
#     queryset = models.Layers.objects.all()









class GeoDadosEspaciaisViewSet(viewsets.ModelViewSet):
    serializer_class = GeoDadosEspaciaisSerializer
  
    def get_queryset(self):
        espatial_data = models.GeoDadosEspaciais.objects.all()
        return espatial_data

    def create(self, request, *args, **kwargs):
        espatial_request = request.data
        # new_geoEspatial = models.GeoDadosEspaciais.objects.create(
        # file=espatial_request["file"],fileupload=espatial_request["fileupload"])
        new_geoEspatial = models.GeoDadosEspaciais.objects.create(file_dbf=espatial_request["file_dbf"],
        file_prj=espatial_request["file_prj"],file_cpg=espatial_request["file_cpg"],
        file_shp=espatial_request["file_shp"],file_shx=espatial_request["file_shx"])
        print('teste')
        new_geoEspatial.save()
        #conversionParser(new_geoEspatial.file_shp)
        a = new_geoEspatial.parserShapFile()
        print(a)
        # print('teste2')
        # populateShapeFile(new_geoEspatial.file_shp)
        # print(new_geoEspatial.file_shp)
        serializer = GeoDadosEspaciaisSerializer(new_geoEspatial)

        return Response(serializer.data)


    # @action(detail=False, methods=['post'])
    # def set_password(self,request, pk=None):
    #     user = self.get_object()
    #     print('user')
    #     print(user)
    #     return Response({"from teste":"sssss"})


class FileUploadViewSet(viewsets.ViewSet):
    def create(self, request):
        print('aaaaa')
        print(request.FILES['thumbnail'])
        serializer_class = FileSerealizer(data=request.data)
        if 'thumbnail' not in request.FILES or not serializer_class.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            handle_uploaded_file(request.FILES['thumbnail'])
            return Response(status=status.HTTP_201_CREATED)


def handle_uploaded_file(file):
    with open(file.name, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

def conversionParser(pathFileSelect):

    pathFile = '/home/sigui_dev/Área de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/media'
    pathResult = f'{pathFile}/{pathFileSelect}' 
    print(pathResult)
    #file = open('/home/sigui_dev/Área de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/app_maps/api/dssad.txt')
    ds = DataSource(pathResult)
    print (ds.layer_count)
    layer = ds[0]
    print(layer.fields)
    print('---')
    print(len(layer))
    print('---')
    print(layer.geom_type)
    print('---')
    print(layer.srs)
