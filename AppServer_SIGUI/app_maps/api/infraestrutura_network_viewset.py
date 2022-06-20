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
        espatial_request = request.data
        id_infra=espatial_request["infra_net_infrastructure_in"]
        infraIN = None
        if id_infra != None:
            infraObjectId=id_infra["id"]
            infraIN = models.Infrastructure.objects.get(id=infraObjectId)

        id_infraOut=espatial_request["infra_net_infrastructure_out"]
        infraOUT = None
        if id_infraOut != None:
            infraoutObjectId=id_infra["id"]
            infraOUT = models.Infrastructure.objects.get(id=infraoutObjectId)

        id_network=espatial_request["infra_net_network"]
        netObjectId=id_network["id"]
        network = models.Network.objects.get(id=netObjectId)

        ####new_geoEspatial = CountySerializer(data = espatial_request)

        new_geoEspatial = models.InfrastructureNetwork.objects.create(infra_net_serial_number=espatial_request["infra_net_serial_number"],
        infra_net_representation=espatial_request["infra_net_representation"],infra_net_status=espatial_request["infra_net_status"],
        infra_net_infrastructure_in=infraIN,infra_net_infrastructure_out=infraOUT,infra_net_network=network,
        geometry=espatial_request["geometry"])
      
        new_geoEspatial.save()

        serializer = InfrastructureNetworkSerializer(new_geoEspatial)

        return Response(serializer.data)