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
from .serializers import InfraestruturaSerializer, FileSerealizer, GeoDadosEspaciaisSerializer,StateSerializer, CountySerializer, DistrictSerializer
from app_maps import models

# class LayersViewSet(viewsets.ModelViewSet):
#     serializer_class = serializers.LayersSerializer
#     queryset = models.Layers.objects.all()

class InfraestruturaViewSet(viewsets.ModelViewSet):
    serializer_class = InfraestruturaSerializer
    queryset = models.Infrastructure.objects.all()

class StateViewSet(viewsets.ModelViewSet):
    serializer_class = StateSerializer

    def retrieve(self, request, pk=None):
        instance = self.get_object()
        return Response(self.serializer_class(instance).data, status=status.HTTP_200_OK)

    def get_queryset(self):
        queryset = models.State.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        espatial_request = request.data

        ####new_geoEspatial = CountySerializer(data = espatial_request)

        new_geoEspatial = models.State.objects.create(name_state=espatial_request["name_state"],
        cod_uf=espatial_request["cod_uf"],initials_uf=espatial_request["initials_uf"],nome_region=espatial_request["nome_region"],
        area_state=espatial_request["area_state"],geometry=espatial_request["geometry"])
      
        new_geoEspatial.save()

        serializer = StateSerializer(new_geoEspatial)

        return Response(serializer.data)

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
        id_state=espatial_request["id_state"]
        test=id_state["id_state"]
        stateEntity = models.State.objects.get(id_state=test)

        ####new_geoEspatial = CountySerializer(data = espatial_request)

        new_geoEspatial = models.County.objects.create(name_county=espatial_request["name_county"],
        cod_ibge=espatial_request["cod_ibge"],initials_uf=espatial_request["initials_uf"],
        name_ugrhi=espatial_request["name_ugrhi"],number_ugrhi=espatial_request["number_ugrhi"],
        cod_environmental=espatial_request["cod_environmental"],id_state=stateEntity,
        area_county=espatial_request["area_county"],geometry=espatial_request["geometry"])
      
        new_geoEspatial.save()
        # if new_geoEspatial.is_valid():
        #     new_geoEspatial.save()
        #     print('Passou!')
        # else: 
        #     print('Não deu certo!')

        serializer = CountySerializer(new_geoEspatial)

        return Response(serializer.data)

class DistrictViewSet(viewsets.ModelViewSet):
    serializer_class = DistrictSerializer

    def get_queryset(self):
        queryset = models.District.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        espatial_request = request.data
        id_county=espatial_request["id_County"]
        countyObjectId=id_county["id_County"]
        stateEntity = models.County.objects.get(id_County=countyObjectId)

        ####new_geoEspatial = CountySerializer(data = espatial_request)

        new_geoEspatial = models.District.objects.create(nome_district=espatial_request["nome_district"],
        area_district=espatial_request["area_district"],id_County=stateEntity,
        geometry=espatial_request["geometry"])
      
        new_geoEspatial.save()

        serializer = DistrictSerializer(new_geoEspatial)

        return Response(serializer.data)


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
