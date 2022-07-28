from ast import Return
from dataclasses import fields
from pyexpat import model
from statistics import mode
from typing import ValuesView
from rest_framework import serializers 
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from django.core.serializers import serialize
from rest_framework.exceptions import ValidationError

from app_maps import models

class EquipamentSerializer(serializers.Serializer):
    value = serializers.CharField(max_length=80)
    viewValue = serializers.CharField(max_length=80)

    def create(self, validated_data):
        return models.Equipament.objects.create(**validated_data)

class FederativeUnitSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.FederativeUnit
        fields = ['id','uf_geocode','uf_name','uf_initials','uf_name_region','uf_area_state']
        geo_field = 'geometry'

    def create(self, validated_data):

        new_geoEspatial = models.FederativeUnit.objects.create(uf_name=validated_data["uf_name"],
        uf_geocode=validated_data["uf_geocode"],uf_initials=validated_data["uf_initials"],uf_name_region=validated_data["uf_name_region"],
        uf_area_state=validated_data["uf_area_state"],geometry=validated_data["geometry"])
      
        return new_geoEspatial

class CountySerializer(GeoFeatureModelSerializer):
    # state = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = models.County
        fields = ['id','co_name','co_cod_ibge','co_initials_uf','co_name_ugrhi','co_number_ugrhi',  
            'co_cod_environmental','co_unit_federal','co_area_county']
        geo_field = 'geometry'

    def create(self, validated_data):

        # id_state=validated_data["co_unit_federal"]
        # test=id_state["id"]
        # stateEntity = models.FederativeUnit.objects.get(id=test)

        new_geoEspatial = models.County.objects.create(co_name=validated_data["co_name"],co_cod_ibge=validated_data["co_cod_ibge"],
        co_initials_uf=validated_data["co_initials_uf"],co_name_ugrhi=validated_data["co_name_ugrhi"],
        co_number_ugrhi=validated_data["co_number_ugrhi"],co_cod_environmental=validated_data["co_cod_environmental"],
        co_unit_federal=validated_data["co_unit_federal"],co_area_county=validated_data["co_area_county"],
        geometry=validated_data["geometry"])
        return new_geoEspatial

  
class DistrictSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.District
        fields = ['id','dc_name','dc_area','dc_county']
        geo_field = 'geometry'

    def create(self, validated_data):

        new_geoEspatial = models.District.objects.create(dc_name=validated_data["dc_name"],
        dc_area=validated_data["dc_area"],dc_county=validated_data['dc_county'],
        geometry=validated_data["geometry"])

        return new_geoEspatial

class ProviderSerializer(serializers.ModelSerializer):
    # state = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = models.Provider
        fields = ['id','p_name','p_description']
    

class SubsystemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Subsystems
        fields = ['id','ss_name','ss_description','ss_category','ss_county','co_provider']

    # def create(self, validated_data):

    #     new_geoEspatial = models.District.objects.create(dc_name=validated_data["dc_name"],
    #     dc_area=validated_data["dc_area"],dc_county=validated_data['dc_county'],
    #     geometry=validated_data["geometry"])

    #     return new_geoEspatial

class StreetSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.Street
        fields = ['id','st_cod_key','st_status','st_name_street','st_name_street_pre',
        'st_type_street','st_type_legislation','st_district_e','st_district_d','st_zip_code_e',
        'st_zip_code_d','st_district']
        geo_field = 'geometry'

    def create(self, validated_data):

        # id_district=espatial_request["st_district"]
        # districtObjectId=id_district["id"]
        # district = models.District.objects.get(id=districtObjectId)

        # ####new_geoEspatial = CountySerializer(data = espatial_request)

        new_geoEspatial = models.Street.objects.create(st_cod_key=validated_data["st_cod_key"],st_name_street=validated_data["st_name_street"],
        st_status=validated_data["st_status"],st_name_street_pre=validated_data["st_name_street_pre"],st_type_street=validated_data["st_type_street"],
        st_type_legislation=validated_data["st_type_legislation"],st_district_e=validated_data["st_district_e"],st_district_d=validated_data["st_district_d"],
        st_zip_code_e=validated_data["st_zip_code_e"],st_zip_code_d=validated_data["st_zip_code_d"],st_district=validated_data['st_district'],
        geometry=validated_data["geometry"]) 

        return new_geoEspatial

class PublicPlaceSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.PublicPlace
        fields = ['id','pp_cod_sector','pp_cod_block','pp_cod_face','pp_total_residences','pp_total_general','pp_district',
        'pp_streat']
        geo_field = 'geometry'

    def create(self, validated_data):

        # id_infra=espatial_request["pp_streat"]
        
        # infraD = None
        # if id_infra != None:
        #     infraObjectId=id_infra["id"]
        #     infraD = models.Street.objects.get(id=infraObjectId)

        # id_subsystem=espatial_request["pp_district"]
        # subsObjectId=id_subsystem["id"]
        # subsystem = models.District.objects.get(id=subsObjectId)

        # ####new_geoEspatial = CountySerializer(data = espatial_request)

        new_geoEspatial = models.PublicPlace.objects.create(pp_cod_sector=validated_data["pp_cod_sector"],
        pp_cod_block=validated_data["pp_cod_block"], pp_cod_face=validated_data["pp_cod_face"], 
        pp_total_residences=validated_data["pp_total_residences"],pp_total_general=validated_data["pp_total_general"],
        pp_streat=validated_data['pp_streat'],pp_district=validated_data['pp_district'],geometry=validated_data["geometry"])

        return new_geoEspatial


class ManufacturerSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.Manufacturer
        fields = ['id','mfr_name','mfr_cnpj','mfr_andress']


class EquipamentSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.Equipament
        fields = ['id','eq_model','eq_representation','eq_manufacturer']

class InfrastructureSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.Infrastructure
        fields = ['id','infra_name','infra_street','infra_category','infra_dependent','infra_subsystems',
        'infra_equipaments','infra_network']
        geo_field = 'geometry'

    def create(self, validated_data):

        # espatial_request = request.data
        # id_infra=espatial_request["infra_dependent"]
        # infraD = None
        # if id_infra != None:
        #     infraObjectId=id_infra["id"]
        #     infraD = models.Infrastructure.objects.get(id=infraObjectId)

        # subsystem = None
        # id_subs=espatial_request["infra_subsystems"]
        # if id_subs != None:
        #     subsObjectId=id_subs["id"]
        #     subsystem = models.Subsystems.objects.get(id=subsObjectId)

        # street = None
        # id_street=espatial_request["infra_street"]
        # if id_subs != None:
        #     setreObjectId=id_street["id"]
        #     street = models.Street.objects.get(id=setreObjectId)

        # geom = None
        # id_street=espatial_request["geometry"]
        # if id_street == '0':
        #     geom = None
        # else: 
        #     geom = espatial_request["geometry"]
       
        ####new_geoEspatial = CountySerializer(data = espatial_request)//infra_street

        new_geoEspatial = models.Infrastructure.objects.create(infra_name=validated_data["infra_name"],
        infra_category=validated_data["infra_category"],infra_dependent=validated_data['infra_dependent'],infra_subsystems=validated_data['infra_subsystems'],
        infra_street=validated_data['infra_street'],geometry=validated_data['geometry'])

        return new_geoEspatial

class EquipamentInfrastructureSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.EquipamentInfrastructure
        fields = ['id','eq_infra_serial_number','eq_infra_representation','eq_infra_status',
        'eq_infra_infraestructure','eq_infra_equipament','eq_infra_subsystem']
      

class NetworkSerializer(serializers.ModelSerializer):
    
   # subsystems = SubsystemsSerializer(many = True,read_only= True)
    net_name = serializers.CharField(required=True)
    net_category = serializers.CharField(required=True)
    net_status = serializers.CharField(required=True)  

    def validate(self,data):
        value = data['net_name']
        print('value')
        print(value)

        if data['net_name'] == 'aaa':
           # data['net_name'] = 'Teste'
           raise serializers.ValidationError("Nome da Rede Incorreto")

        return data

    def create(self, validated_data):

            #primeira opção
            ##tracks = validated_data.pop('net_subsystems')
            ##stateEntity = models.Subsystems.objects.get(id=validated_data["net_subsystems"]['id'])#validated_data["net_subsystems"])
            
            #segunda
            # # instance = models.Network.objects.create(**validated_data)
            # # return instance
            # if validated_data["net_name"] != None:
            new_geoEspatial = models.Network.objects.create(net_name=validated_data["net_name"],
            net_category=validated_data["net_category"],net_status=validated_data["net_status"],
            net_subsystems=validated_data["net_subsystems"])
            return new_geoEspatial
            # else:
            #     print('net_name not informed')
            #     raise serializers.ValidationError("net_name not informed")


    class Meta:
        model = models.Network
        fields = ['id','net_name','net_category','net_status','net_subsystems']
        #depth = 1

        # def validate_net_name(self,data):
        #     if data["net_name"] != None:
        #       #  data["uf_geocode"] = models.Subsystems.objects.get(id=data["net_subsystems"]['id'])
        #         print('net_name')
        #         print(data["net_name"])
        #         return data
        #     else:
        #         print('net_name not informed')
        #         raise serializers.ValidationError("net_name not informed")
        
       
       

       
          
        

class InfrastructureNetworkSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.InfrastructureNetwork
        fields = ['id','infra_net_serial_number','infra_net_representation','infra_net_status',
        'infra_net_infrastructure_in','infra_net_infrastructure_out','infra_net_equipament',
        'infra_net_network']
        geo_field = 'geometry'

    def create(self, validated_data):
        #  id_infra=espatial_request["infra_net_infrastructure_in"]
        # infraIN = None
        # if id_infra != None:
        #     infraObjectId=id_infra["id"]
        #     infraIN = models.Infrastructure.objects.get(id=infraObjectId)

        # id_infraOut=espatial_request["infra_net_infrastructure_out"]
        # infraOUT = None
        # if id_infraOut != None:
        #     infraoutObjectId=id_infra["id"]
        #     infraOUT = models.Infrastructure.objects.get(id=infraoutObjectId)

        # id_network=espatial_request["infra_net_network"]
        # netObjectId=id_network["id"]
        # network = models.Network.objects.get(id=netObjectId)

        # ####new_geoEspatial = CountySerializer(data = espatial_request)

        new_geoEspatial = models.InfrastructureNetwork.objects.create(infra_net_serial_number=validated_data["infra_net_serial_number"],
        infra_net_representation=validated_data["infra_net_representation"],infra_net_status=validated_data["infra_net_status"],
        infra_net_infrastructure_in=validated_data['infra_net_infrastructure_in'],infra_net_infrastructure_out=validated_data['infra_net_infrastructure_out'],infra_net_network=validated_data['infra_net_network'],
        geometry=validated_data["geometry"])

        return new_geoEspatial

class EquipamentInfrastructureNetworkSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.EquipamentInfrastructureNetwork
        fields = ['id','eq_infra_net_serial_number','eq_infra_net_representation',
        'eq_infra_net_status','eq_infra_net_infraestructure','eq_infra_net_equipament',
        'eq_infra_net_subsystem']

        

class EquipamentCountySerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.EquipamentCounty
        fields = ['id','eq_co_cod','eq_co_equipament','eq_co_type',
        'eq_co_departament_admin','eq_co_name_complete','eq_co_first_name',
        'eq_co_name','eq_co_name_map','eq_co_street','eq_co_number_building',
        'eq_co_district','eq_co_observation','eq_co_cod_maintainer']
        geo_field = 'geometry'

    def create(self, validated_data):

        # id_infra=espatial_request["eq_co_street"]
        # stretId = None
        # if id_infra != None:
        #     infraObjectId=id_infra["id"]
        #     stretId = models.Street.objects.get(id=infraObjectId)

        # id_dist=espatial_request["eq_co_district"]
        # ditObjectId=id_dist["id"]
        # ddID = models.District.objects.get(id=ditObjectId)

        # id_pp=espatial_request["eq_co_public_place"]
        # ppObjectId=id_pp["id"]
        # ppID = models.PublicPlace.objects.get(id=ppObjectId)
        #      

        new_geoEspatial = models.EquipamentCounty.objects.create(eq_co_cod=validated_data["eq_co_cod"],
        eq_co_equipament=validated_data["eq_co_equipament"], eq_co_type=validated_data["eq_co_type"], 
        eq_co_departament_admin=validated_data["eq_co_departament_admin"],eq_co_name_complete=validated_data["eq_co_name_complete"],
        eq_co_first_name=validated_data["eq_co_first_name"],eq_co_name=validated_data["eq_co_name"],
        eq_co_name_map=validated_data["eq_co_name_map"],eq_co_number_building=validated_data["eq_co_number_building"],
        eq_co_observation=validated_data["eq_co_observation"],#,eq_co_cod_maintainer=espatial_request["eq_co_cod_maintainer"]
        eq_co_street=validated_data['eq_co_street'],eq_co_public_place=validated_data['eq_co_public_place'],eq_co_district=validated_data['validated_data'],
        geometry=validated_data["geometry"])

        return new_geoEspatial


class FileSerealizer (serializers.Serializer):
    file = serializers.FileField(max_length=None, allow_empty_file=False)

class GeoDadosEspaciaisSerializer (serializers.ModelSerializer):
    class Meta:
        model = models.GeoDadosEspaciais
        fields = '__all__'

    # def validate_file_dbf(self, file_dbf: str) -> str:
    #     if len(file_dbf) < 10:
    #         raise serializers.ValidationError(
    #             "Username must be at least 10 characters long.",
    #         )
    #     return file_dbf

    def create(self, validated_data):            

        new_geoEspatial = models.GeoDadosEspaciais.objects.create(category=validated_data["category"],file_dbf=validated_data["file_dbf"],
        file_prj=validated_data["file_prj"],file_cpg=validated_data["file_cpg"],
        file_sbn=validated_data["file_sbn"],file_sbx=validated_data["file_sbx"],
        file_shp=validated_data["file_shp"],file_shx=validated_data["file_shx"])
        #new_geoEspatial.add

        return new_geoEspatial