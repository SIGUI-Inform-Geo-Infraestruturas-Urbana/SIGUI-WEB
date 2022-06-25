from ast import Return
from dataclasses import fields
from pyexpat import model
from statistics import mode
from typing import ValuesView
from rest_framework import serializers 
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from django.core.serializers import serialize

from app_maps import models

# class LayersSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Layers
#         fields = '__all__'

class EquipamentSerializer(serializers.Serializer):
    value = serializers.CharField(max_length=80)
    viewValue = serializers.CharField(max_length=80)

    def create(self, validated_data):
        return models.Equipament.objects.create(**validated_data)

# class EquipamentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Equipament
#         fields = '__all__'

# class InfraestructureSerializer(GeoFeatureModelSerializer):
#     def serializer():
#         serialize('geojson',models.Infrastructure.objects.all(),
#                 geometry_field='position',fields=('nomeInfraestructure',))

# class InfraestruturaSerializer(GeoFeatureModelSerializer):
#     class Meta:
#         model = models.Infrastructure
#         fields = '__all__'
#         geo_field = 'position'


class FederativeUnitSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.FederativeUnit
        fields = ['id','uf_geocode','uf_name','uf_initials','uf_name_region','uf_area_state']
        geo_field = 'geometry'

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

   # def create(self, validated_data):
        #a = validated_data.pop('co_initials_uf')
        
        #return a
        # print(validated_data)
        #validate_field = models.County.objects.create(co_unit_federal = validated_data['co_unit_federal'])
        
        #return validated_data['co_unit_federal']
        #validate_field = validated_data['co_unit_federal']
        #item = []
        #item = validated_data.pop('id_state')
        #print('TESRTTRTT')
        #print(item)
        #print('AAAAAAAAA')
        #print(item.id_state)
        #stateEntity = models.State.objects.get(id_state=item.id_state)
        #county = models.County.objects.create(id_state = stateEntity)   
        #return county
        #return super().create(validated_data)

    # def create(self, validated_data):
    #     #item = []
    #     #item = validated_data.pop('name_county')
    #     print('TESRTTRTT')
    #    # print(item)
    #     print('AAAAAAAAA')
    #     stateEntity = models.State.objects.get(id_state=1)
    #     county = models.County.objects.create(id_state = stateEntity)   
    #     return county
    #     #return super().create(validated_data)

    
    # def create(self, validated_data):
    #     item = []
    #     item = validated_data.pop('id_state')
    #     print('TESRTTRTT')
    #     print(item)
    #     print('AAAAAAAAA')
    #     print(item.id_state)
    #     stateEntity = models.State.objects.get(id_state=item.id_state)
    #     county = models.County.objects.create(id_state = stateEntity)   
    #     return county
    #     #return super().create(validated_data)

class DistrictSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.District
        fields = ['id','dc_name','dc_area','dc_county']
        geo_field = 'geometry'

class ProviderSerializer(serializers.ModelSerializer):
    # state = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = models.Provider
        fields = ['id','p_name','p_description']

class SubsystemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Subsystems
        fields = ['id','ss_name','ss_description','ss_category','ss_county','co_provider']

class StreetSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.Street
        fields = ['id','st_cod_key','st_status','st_name_street','st_name_street_pre',
        'st_type_street','st_type_legislation','st_district_e','st_district_d','st_zip_code_e',
        'st_zip_code_d','st_district']
        geo_field = 'geometry'

class PublicPlaceSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.PublicPlace
        fields = ['id','pp_cod_sector','pp_cod_block','pp_cod_face','pp_total_residences','pp_total_general','pp_district',
        'pp_streat']
        geo_field = 'geometry'

class DistrictSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.District
        fields = ['id','dc_name','dc_area','dc_county']
        geo_field = 'geometry'

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

class EquipamentInfrastructureSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.EquipamentInfrastructure
        fields = ['id','eq_infra_serial_number','eq_infra_representation','eq_infra_status',
        'eq_infra_infraestructure','eq_infra_equipament','eq_infra_subsystem']
      

class NetworkSerializer(serializers.ModelSerializer):
    
   # subsystems = SubsystemsSerializer(many = True,read_only= True)

    class Meta:
        model = models.Network
        fields = ['id','net_name','net_category','net_status','net_subsystems']
        #depth = 1

        # def validate(self,data):
        #     if data["net_subsystems"]["id"] != None:
        #         data["net_subsystems"] = models.Subsystems.objects.get(id=data["net_subsystems"]['id'])
        #         print('stateEntity')
        #         print(data["net_subsystems"])
        #     return data

        def create(self, validated_data):

            #primeira opção
            ##tracks = validated_data.pop('net_subsystems')
            ##stateEntity = models.Subsystems.objects.get(id=validated_data["net_subsystems"]['id'])#validated_data["net_subsystems"])
            
            #segunda
            # # instance = models.Network.objects.create(**validated_data)
            # # return instance

            new_geoEspatial = models.Network.objects.create(net_name=validated_data["net_name"],
            net_category=validated_data["net_category"],net_status=validated_data["net_status"],
            net_subsystems=validated_data["net_subsystems"])
            return new_geoEspatial
        

class InfrastructureNetworkSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = models.InfrastructureNetwork
        fields = ['id','infra_net_serial_number','infra_net_representation','infra_net_status',
        'infra_net_infrastructure_in','infra_net_infrastructure_out','infra_net_equipament',
        'infra_net_network']
        geo_field = 'geometry'

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


class FileSerealizer (serializers.Serializer):
    file = serializers.FileField(max_length=None, allow_empty_file=False)

class GeoDadosEspaciaisSerializer (serializers.ModelSerializer):
    class Meta:
        model = models.GeoDadosEspaciais
        fields = '__all__'