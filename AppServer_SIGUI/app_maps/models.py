from email.policy import strict
import os
from statistics import mode
from django.contrib.gis.gdal import DataSource
from django.contrib.gis.utils import LayerMapping
from distutils.command.upload import upload
from operator import truediv
from pyexpat import model
from django.contrib.gis.db import models
from uuid import uuid4

# Create your models here.

class Layers(models.Model):
    id_layer = models.AutoField(primary_key=True)#UUIDField(primary_key=True,default=uuid4,editable=False)
    name = models.CharField(max_length=80)
    location = models.CharField(max_length=80)

class Equipament(models.Model):
    id = models.AutoField(primary_key=True)
    value = models.CharField(max_length=80)
    viewValue = models.CharField(max_length=80)

    # def __str__(self):
    #     return self.
class Infrastructure(models.Model):
    id = models.AutoField(primary_key=True)
    nomeInfraestructure = models.CharField(max_length=80)
    idDetentor = models.IntegerField()
    position = models.PointField()     
    # class Meta:
    #     managed = True
    #     db_table = 'app_maps_infrastructure'


def upload_file_espatial(instance, filename):
    print('instance')

    return f"{instance.id_espatial}/{instance.id_espatial}-{filename}"

class GeoDadosEspaciais(models.Model):
    id_espatial = models.UUIDField(primary_key=True,default=uuid4,editable=False)
    file = models.ImageField(upload_to=upload_file_espatial, blank=True, null=True)
    fileupload = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)
    file_dbf = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)
    file_prj = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)
    file_qpj = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)
    file_cpg = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)
    file_shp = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)
    file_shx = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)

    def parserShapFile(self):
        pathFileSelect = self.file_shp
        pwd = os.path.dirname(__file__)#/home/sigui_dev/Área de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/app_maps/api
        print('shaping')
        print(pwd)
        
        pathFile = '/home/sigui_dev/Área de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/media'
        pathResult = f'{pathFile}/{pathFileSelect}' 

        print('shape')
        print(pathResult)

        # mapping = {'nome_municipio':'Nome',
        #             'cod_ambiental':'Cod_Cetesb',
        #             'cod_ibge':'Cod_ibge',
        #             'numero_ugrhi':'UGRHI',
        #             'nome_ugrhi':'Nome_ugrhi',
        #             'poly':'POLYGON',
        #             }
        mapping = {'name_county':'NM_MUN',
            'cod_ibge':'CD_MUN',
            'initials_uf':'NM_MUN',
            'area_county':'AREA_KM2',
            'geometry':'POLYGON',
            }
        lm = LayerMapping(County, pathResult, mapping)
        lm.save(verbose=True, strict=True)
        return pathResult

class TestGeo(models.Model):
    name = models.CharField(max_length=254)
    poly = models.PolygonField(srid=4326)

    def __str__(self):
        return 'Name: %s' % self.name

class State(models.Model):
    id_state = models.AutoField(primary_key=True)
    name_state = models.CharField(max_length=254,blank=True, null=True)#nome_uf
    cod_uf = models.CharField(max_length=250,blank=True, null=True)
    initials_uf = models.CharField(max_length=250,blank=True, null=True)
    nome_region = models.CharField(max_length=250,blank=True, null=True)
    area_state = models.FloatField(blank=True, null=True)    
    geometry = models.MultiPolygonField(srid=4326,blank=True, null=True)
    def __str__(self):
        return 'id: %s' % self.id_state   
    

class County(models.Model):
    id_County = models.AutoField(primary_key=True)
    cod_ibge = models.IntegerField(blank=True, null=True)
    name_county = models.CharField(max_length=254,blank=True, null=True)
    initials_uf = models.CharField(max_length=250,blank=True, null=True)
    name_ugrhi = models.CharField(max_length=254,blank=True, null=True)
    number_ugrhi = models.IntegerField(blank=True, null=True)
    cod_environmental = models.IntegerField(blank=True, null=True)  
    id_state = models.ForeignKey(State, on_delete=models.CASCADE)
    area_county = models.FloatField(blank=True, null=True) 
    geometry = models.MultiPolygonField(srid=4326,blank=True, null=True)

    # def __str__(self):
    #     return 'Name: %s' % self.name_county
    
    # class Meta:
    #     managed = True
    #     db_table = 'app_maps_municipio'

class District(models.Model):
    id_district= models.AutoField(primary_key=True)
    nome_district = models.CharField(max_length=254,blank=True, null=True)   
    area_district = models.FloatField(blank=True, null=True)   
    id_County = models.ForeignKey(County, on_delete=models.CASCADE, blank=True, null=True)
    geometry = models.MultiPolygonField(srid=4326,blank=True, null=True)
    
    # def __str__(self):
    #     return 'Name: %s' % self.nome_district  
