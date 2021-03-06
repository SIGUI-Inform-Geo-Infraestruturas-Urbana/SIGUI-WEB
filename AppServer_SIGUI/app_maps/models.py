from email.policy import strict
from enum import unique
import os
from statistics import mode
from django.contrib.gis.gdal import DataSource
from django.contrib.gis.utils import LayerMapping
from distutils.command.upload import upload
from operator import truediv
from pyexpat import model
from django.contrib.gis.db import models
from uuid import uuid4
from django.contrib.auth.models import User

# Create your models here.

# class Layers(models.Model):
#     id_layer = models.AutoField(primary_key=True)#UUIDField(primary_key=True,default=uuid4,editable=False)
#     name = models.CharField(max_length=80)
#     location = models.CharField(max_length=80)

# class Equipament(models.Model):
#     id = models.AutoField(primary_key=True)
#     value = models.CharField(max_length=80)
#     viewValue = models.CharField(max_length=80)

#     # def __str__(self):
#     #     return self.
# class Infrastructure(models.Model):
#     id = models.AutoField(primary_key=True)
#     nomeInfraestructure = models.CharField(max_length=80)
#     idDetentor = models.IntegerField()
#     position = models.PointField()     
#     # class Meta:
#     #     managed = True
#     #     db_table = 'app_maps_infrastructure'


def upload_file_espatial(instance, filename):
    print('instance')
    nameurl = "shape_{0}/{1}".format(instance.id_espatial, filename)
    print(nameurl)

    return nameurl
    # return f"{instance.id_espatial}/4100608_faces_de_logradouros_2020"

def nameFilesPath(id_espatial):
    print('instance')
    nameurl = "shape_{0}".format( id_espatial)
    print(nameurl)

    return nameurl
    # return f"{instance.id_espatial}/4100608_faces_de_logradouros_2020"


class GeoDadosEspaciais(models.Model):
    id_espatial = models.UUIDField(primary_key=True,default=uuid4,editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE,blank=True, null=True)
    category = models.CharField(max_length=50,blank=True, null=True)#nome_uf
    #namefile = models.CharField(default=nameFilesPath(id_espatial),max_length=50,blank=True, null=True)
    file = models.ImageField(upload_to=upload_file_espatial, blank=True, null=True)
    fileupload = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)
    file_dbf = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)
    file_prj = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)
    file_qpj = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)
    file_cpg = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)
    file_shp = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)
    file_shx = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)
    file_sbn = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)
    file_sbx = models.FileField(upload_to=upload_file_espatial, blank=True, null=True)

    def parserShapFileState(self):
        pathFileSelect = self.file_shp
        pwd = os.path.dirname(__file__)#/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/app_maps/api
        print('shaping')
        print(pwd)
        
        pathFile = '/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/media'
        pathResult = f'{pathFile}/{pathFileSelect}' 

        print('shape')
        print(pathResult)

        mapping = {'uf_name':'NM_UF',
            'uf_initials':'SIGLA',
            'uf_geocode':'CD_UF',
            'uf_name_region':'NM_REGIAO',
            'geometry':'POLYGON',
            }
        lm = LayerMapping(FederativeUnit, pathResult, mapping,unique=('uf_name'))
        lm.save(verbose=True, strict=True)
        return pathResult
        

    def parserShapFile(self):
        pathFileSelect = self.file_shp
        pwd = os.path.dirname(__file__)#/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/app_maps/api
        print('shaping')
        print(pwd)
        
        pathFile = '/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/media'
        pathResult = f'{pathFile}/{pathFileSelect}' 

        print('shape')
        print(pathResult)

        mapping = {'co_name':'NM_MUN',
            'co_cod_ibge':'CD_MUN',
            'co_initials_uf':'NM_MUN',
            'co_area_county':'AREA_KM2',
            'geometry':'POLYGON',
            }
        lm = LayerMapping(County, pathResult, mapping,unique=('co_name'))
        lm.save(verbose=True, strict=True)
        return pathResult

    
    def parserShapFilePublicPlace(self):
        pathFileSelect = self.file_shp
        pwd = os.path.dirname(__file__)#/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/app_maps/api
        print('shaping')
        print(pwd)
        
        pathFile = '/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/media'
        pathResult = f'{pathFile}/{pathFileSelect}' 

        print('shape')
        print(pathResult)

        mapping = {
            'pp_cod_sector':'CD_SETOR',
            'pp_name_seg_log':'NM_LOG',
            'pp_name_tip_log':'NM_TIP_LOG',
            'pp_name_title':'NM_TIT_LOG',
            'pp_cod_block':'CD_QUADRA',
            'pp_cod_face':'CD_FACE',
            'pp_total_residences':'TOT_RES',
            'pp_total_general':'TOT_GERAL',          
            'geometry':'LineString',
            }
        lm = LayerMapping(PublicPlace, pathResult, mapping)
        lm.save(verbose=True, strict=True)
        return pathResult

   
    def parserShapFileStreet(self):
        pathFileSelect = self.file_shp
        pwd = os.path.dirname(__file__)#/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/app_maps/api
        print('shaping')
        print(pwd)
        
        pathFile = '/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/media'
        pathResult = f'{pathFile}/{pathFileSelect}' 

        print('shape')
        print(pathResult)

        mapping = {'st_cod_key':'CHAVE',
            #'CODVIA':'CODVIA', a analisar
            #'uf_geocode':'NOINICIO',
            #'uf_name_region':'NOFIM',
            'st_status':'STATUS',
            'st_name_street':'NMVIA',
            'st_name_street_pre':'NMVIA_ANT',
            'st_type_street':'SVIARIO',
            'st_type_legislation':'SVIARIOLEG',
            #'uf_name_region':'HIERARQUIA',
            #'uf_name_region':'STATUS_DEM',
            #'st_district':'COD_BAIRRO', analizar relacionamento auto
            'st_district_e':'BAIRRO_E',
            'st_district_d':'BAIRRO_D',
            #'uf_name_region':'COD_REG',
            #'uf_name_region':'REGIONAL_E',
            #'uf_initials':'REGIONAL_D',
            'st_zip_code_e':'CEP_E',
            'st_zip_code_d':'CEP_D',
            #'uf_initials':'CEP_INFO',
            'geometry':'LineString',
            }
        lm = LayerMapping(Street, pathResult, mapping)
        lm.save(verbose=True, strict=True)
        return pathResult
        
        #['OBJECTID', 'CODIGO', 'TIPO', 'NOME', 'FONTE', 'CD_REGIONA', 'NM_REGIONA', 'SHAPE_AREA', 'SHAPE_LEN']
    def parserShapFileDistrict(self):
        pathFileSelect = self.file_shp
        pwd = os.path.dirname(__file__)#/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/app_maps/api
        print('shaping')
        print(pwd)
        
        pathFile = '/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/media'
        pathResult = f'{pathFile}/{pathFileSelect}' 

        print('shape')
        print(pathResult)

        mapping = {
            #'id':'OBJECTID', cod impo
            #'CODVIA':'CODIGO', 
            #'uf_geocode':'TIPO', nao
            'dc_name':'NOME',
            #'st_status':'FONTE', importante
            #'st_name_street':'CD_REGIONA',
            #'st_name_street_pre':'NM_REGIONA',
            'dc_area':'SHAPE_AREA',
            #'st_type_legislation':'SHAPE_LEN',
            'geometry':'Polygon',
            }
        lm = LayerMapping(District, pathResult, mapping)
        lm.save(verbose=True, strict=True)
        return pathResult
    
    def parserShapFileEquipament(self):
        pathFileSelect = self.file_shp
        pwd = os.path.dirname(__file__)#/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/app_maps/api
        print('shaping')
        print(pwd)
        
        pathFile = '/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/media'
        pathResult = f'{pathFile}/{pathFileSelect}' 

        print('shape')
        print(pathResult)

        mapping = {'eq_co_cod':'CD_EQUI', 
        #'':'CD_LOCAL',# 'CD_TEMA',#'TEMA',#'ID_EQUIP',
        'eq_co_equipament': 'EQUIPAMENT',
        'eq_co_type': 'TIPO_EQUI',
        'eq_co_departament_admin':'DEP_ADMIN',
        'eq_co_name_complete' : 'NOME_COMPL',
        'eq_co_first_name':'PRE_NOME',
        'eq_co_name':'NOME',
        #'SIGLA_EQUI',#'CONVENIADO',#'NOME_ABREV',
        'eq_co_name_map': 'NOME_MAPA',
        #'eq_co_street':'CD_RUA', relacionamento
        #'':'NOME_RUA',#'NOME_RUANO',
        'eq_co_number_building':'NUM_PRED',
        #'COMPL_END',
        #'DIVULGAR_E', analizar atributo priva
        #'INDFISCAL', analizar
        #'CD_BAIRRO', relacionamento
        #'BAIRRO',
        #'QUADR_EQUI', relacionamento
        #'CD_REGIONA',#'REGIONAL',
        # 'CD_DISTRIT', 'NM_DISTRIT',
        #'FUNC_MANHA',#'FUNC_TARDE',#'FUNC_NOITE',#'FUNC_24HR', 
        #'TELEFONE',#'RAMAL',#'EMAIL',#'SITE',
        #'DT_INAUGUR',#'DT_ATUALIZ', 
        'eq_co_observation':'OBSERVACAO',
        # 'FONTE', 
        'eq_co_cod_maintainer':'CD_MANTENE',#'DS_MANTENE',
        #'SIGLA_MANT',
        #'COORD_E','COORD_N',
        # 'LAT_SIRGAS','LON_SIRGAS',
        'geometry':'Point'}

        lm = LayerMapping(EquipamentCounty, pathResult, mapping, encoding='latin-1')
        lm.save(verbose=True, strict=True)
        return pathResult

    def conversionParser(self):
        pathFileSelect = self.file_shp
        pwd = os.path.dirname(__file__)#/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/app_maps/api
        print('shaping')
        print(pwd)
        #AppServer_SIGUI/media/teste/4100608_faces_de_logradouros_2020.shp
        pathFile = '/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/media'
        pathResult = f'{pathFile}/{pathFileSelect}' 
        print(pathResult)
        #file = open('/home/sigui_dev/??rea de Trabalho/Development/SIGUI-WEB/AppServer_SIGUI/app_maps/api/dssad.txt')
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

# class TestGeo(models.Model):
#     name = models.CharField(max_length=254)
#     poly = models.PolygonField(srid=4326)

#     def __str__(self):
#         return 'Name: %s' % self.name


class FederativeUnit(models.Model):
    id = models.AutoField(primary_key=True,editable=True)
    uf_name = models.CharField(max_length=254,blank=True, null=True)#nome_uf
    uf_geocode = models.CharField(max_length=250,blank=True, null=True)
    uf_initials = models.CharField(max_length=250,blank=True, null=True)
    uf_name_region = models.CharField(max_length=250,blank=True, null=True)
    uf_area_state = models.FloatField(blank=True, null=True)    
    geometry = models.MultiPolygonField(srid=4326,blank=True, null=True)
    def __str__(self):
        return 'id: %s' % self.id   
    

class County(models.Model):
    id = models.AutoField(primary_key=True,editable=True)
    co_cod_ibge = models.CharField(max_length=254,blank=True, null=True)
    co_name = models.CharField(max_length=254,blank=True, null=True)
    co_initials_uf = models.CharField(max_length=250,blank=True, null=True)
    co_name_ugrhi = models.CharField(max_length=254,blank=True, null=True)
    co_number_ugrhi = models.IntegerField(blank=True, null=True)
    co_cod_environmental = models.IntegerField(blank=True, null=True)  
    co_unit_federal = models.ForeignKey(FederativeUnit, on_delete=models.CASCADE,blank=True, null=True)
    co_area_county = models.FloatField(blank=True, null=True) 
    geometry = models.MultiPolygonField(srid=4326,blank=True, null=True)

    def __str__(self):
        return 'id: %s' % self.id  
    
    # class Meta:
    #     managed = True
    #     db_table = 'app_maps_municipio'

class District(models.Model):
    id= models.AutoField(primary_key=True,editable=True)
    dc_name = models.CharField(max_length=254,blank=True, null=True)   
    dc_area = models.FloatField(blank=True, null=True)   
    dc_county = models.ForeignKey(County, on_delete=models.CASCADE, blank=True, null=True)
    geometry = models.MultiPolygonField(srid=4326,blank=True, null=True) 
     
    def __str__(self):
       return 'id: %s' % self.id   

class Provider(models.Model):
    id = models.AutoField(primary_key=True,editable=True)
    p_name = models.CharField(max_length=254)
    p_description = models.CharField(max_length=254) 

    def __str__(self):
        return 'id: %s' % self.id  

class Subsystems(models.Model):
    id = models.AutoField(primary_key=True,editable=True)
    ss_name = models.CharField(max_length=254)
    ss_description = models.CharField(max_length=254)
    ss_category = models.CharField(max_length=254)
    ss_county = models.ForeignKey(County, on_delete=models.CASCADE)
    co_provider = models.ForeignKey(Provider, on_delete=models.CASCADE)   

    def __str__(self):
        return 'id: %s' % self.id  

class Street(models.Model):
    id= models.AutoField(primary_key=True,editable=True)
    st_cod_key = models.CharField(max_length=15,blank=True, null=True)  
    st_status = models.CharField(max_length=100,blank=True, null=True)  
    st_name_street = models.CharField(max_length=254,blank=True, null=True)    
    st_name_street_pre = models.CharField(max_length=254,blank=True, null=True)    
    st_type_street = models.CharField(max_length=254,blank=True, null=True)    
    st_type_legislation = models.CharField(max_length=254,blank=True, null=True)    
    st_district_e =models.CharField(max_length=254,blank=True, null=True)  
    st_district_d =models.CharField(max_length=254,blank=True, null=True)  
    st_zip_code_e =models.CharField(max_length=254,blank=True, null=True)  
    st_zip_code_d =models.CharField(max_length=254,blank=True, null=True)
    st_district = models.ForeignKey(District, on_delete=models.CASCADE, blank=True, null=True)
    geometry = models.MultiLineStringField(srid=4326,blank=True, null=True)
    
    def __str__(self):
       return 'id: %s' % self.id   

class PublicPlace(models.Model):
    id= models.AutoField(primary_key=True,editable=True)
    pp_name_seg_log = models.CharField(max_length=60,blank=True, null=True)  
    pp_name_tip_log = models.CharField(max_length=20,blank=True, null=True)  
    pp_name_title = models.CharField(max_length=30,blank=True, null=True)  
    pp_cod_sector = models.BigIntegerField(blank=True, null=True)   
    pp_cod_block = models.CharField(max_length=3,blank=True, null=True)   
    pp_cod_face = models.CharField(max_length=3,blank=True, null=True)   
    pp_total_residences = models.CharField(max_length=3 ,blank=True, null=True)   
    pp_total_general =models.CharField(max_length=3 , blank=True, null=True)     
    pp_district = models.ForeignKey(District, on_delete=models.CASCADE, blank=True, null=True)
    pp_streat = models.ForeignKey(Street, on_delete=models.CASCADE, blank=True, null=True)
    geometry = models.LineStringField(srid=4326,blank=True, null=True)
    
    def __str__(self):
       return 'id: %s' % self.id  

class Manufacturer(models.Model):
    id= models.AutoField(primary_key=True,editable=True)
    mfr_name= models.CharField(max_length=254,blank=True, null=True) 
    mfr_cnpj = models.CharField(max_length=254,blank=True, null=True) 
    mfr_andress = models.CharField(max_length=254,blank=True, null=True) 
        
    def __str__(self):
       return 'id: %s' % self.id  

class Equipament(models.Model):
    id= models.AutoField(primary_key=True,editable=True)
    eq_model= models.CharField(max_length=254,blank=True, null=True) 
    eq_representation = models.CharField(max_length=254,blank=True, null=True) 
    eq_manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE, blank=True, null=True)
        
    def __str__(self):
       return 'id: %s' % self.id  

class Infrastructure(models.Model):
    id= models.AutoField(primary_key=True,editable=True)
    infra_name = models.CharField(max_length=254,blank=True, null=True)   
    infra_category = models.CharField(max_length=254,blank=True, null=True)      
    infra_dependent = models.ForeignKey('self', on_delete=models.CASCADE,related_name='dependent', blank=True, null=True)
    infra_street = models.ForeignKey(Street, on_delete=models.CASCADE, blank=True, null=True)
    infra_subsystems = models.ForeignKey(Subsystems, on_delete=models.CASCADE, blank=True, null=True)
    infra_equipaments = models.ManyToManyField(Equipament,through='EquipamentInfrastructure')
    infra_network = models.ManyToManyField('self',through='InfrastructureNetwork',related_name='network',symmetrical=False)
   
    geometry = models.PointField(srid=4326,blank=True, null=True)
    
    def __str__(self):
       return 'id: %s' % self.id  

class EquipamentInfrastructure(models.Model):
    id= models.AutoField(primary_key=True,editable=True)
    eq_infra_serial_number= models.IntegerField(blank=True, null=True) 
    eq_infra_representation = models.CharField(max_length=254,blank=True, null=True)      
    eq_infra_status = models.IntegerField(blank=True, null=True)
    eq_infra_infrastructure = models.ForeignKey(Infrastructure, on_delete=models.CASCADE, blank=True, null=True)
    eq_infra_equipament = models.ForeignKey(Equipament, on_delete=models.CASCADE, blank=True, null=True)
    eq_infra_subsystem = models.ForeignKey(Subsystems, on_delete=models.CASCADE, blank=True, null=True)
    
    def __str__(self):
       return 'id: %s' % self.id 

class Network(models.Model):
    id= models.AutoField(primary_key=True,editable=True)
    net_name= models.CharField(max_length=254,blank=True, null=True) 
    net_category = models.CharField(max_length=254,blank=True, null=True) 
    net_status = models.CharField(max_length=254,blank=True, null=True) 
    net_subsystems = models.ForeignKey(Subsystems, related_name='subsystems' ,on_delete=models.CASCADE, blank=True, null=True)
        
    def __str__(self):
       return 'id: %s' % self.id  

class InfrastructureNetwork(models.Model):
    id= models.AutoField(primary_key=True,editable=True)
    infra_net_serial_number= models.IntegerField(blank=True, null=True) 
    infra_net_representation= models.CharField(max_length=254,blank=True, null=True) 
    infra_net_status= models.CharField(max_length=254,blank=True, null=True) 
    infra_net_infrastructure_in = models.ForeignKey(Infrastructure, on_delete=models.CASCADE, related_name='infraestructure_in',blank=True, null=True)
    infra_net_infrastructure_out = models.ForeignKey(Infrastructure, on_delete=models.CASCADE, related_name='infraestructure_out',blank=True, null=True)
    infra_net_equipament = models.ManyToManyField(Equipament,through='EquipamentInfrastructureNetwork')
    infra_net_network = models.ForeignKey(Network, on_delete=models.CASCADE, blank=True, null=True)
    geometry = models.LineStringField(srid=4326,blank=True, null=True)  
    def __str__(self):
       return 'id: %s' % self.id 

class EquipamentInfrastructureNetwork(models.Model):
    id= models.AutoField(primary_key=True,editable=True)
    eq_infra_net_serial_number= models.IntegerField(blank=True, null=True) 
    eq_infra_net_representation= models.CharField(max_length=254,blank=True, null=True) 
    eq_infra_net_status= models.CharField(max_length=254,blank=True, null=True) 
    eq_infra_net_infrastructure = models.ForeignKey(InfrastructureNetwork, on_delete=models.CASCADE, blank=True, null=True)
    eq_infra_net_equipament = models.ForeignKey(Equipament, on_delete=models.CASCADE, blank=True, null=True)
    eq_infra_net_subsystem = models.ForeignKey(Subsystems, on_delete=models.CASCADE, blank=True, null=True)
           
    def __str__(self):
       return 'id: %s' % self.id  

class EquipamentCounty(models.Model):
    id= models.AutoField(primary_key=True,editable=True)
    eq_co_cod= models.FloatField(blank=True, null=True) 
    eq_co_equipament= models.CharField(max_length=150,blank=True, null=True) 
    eq_co_type= models.CharField(max_length=150,blank=True, null=True) 
    eq_co_departament_admin= models.CharField(max_length=60,blank=True, null=True) 
    eq_co_name_complete = models.CharField(max_length=254,blank=True, null=True) 
    eq_co_first_name= models.CharField(max_length=150,blank=True, null=True) 
    eq_co_name= models.CharField(max_length=150,blank=True, null=True) 
    eq_co_name_map= models.CharField(max_length=111,blank=True, null=True) 
    eq_co_street= models.ForeignKey(Street, on_delete=models.CASCADE, blank=True, null=True)
    eq_co_public_place= models.ForeignKey(PublicPlace, on_delete=models.CASCADE, blank=True, null=True)
    eq_co_number_building= models.CharField(max_length=15,blank=True, null=True) 
    eq_co_district= models.ForeignKey(District, on_delete=models.CASCADE, blank=True, null=True)
    eq_co_observation= models.CharField(max_length=254,blank=True, null=True) 
    eq_co_cod_maintainer= models.IntegerField(blank=True, null=True) 
    geometry= models.PointField(srid=4326,blank=True, null=True) 

    def __str__(self):
       return 'id: %s' % self.id 