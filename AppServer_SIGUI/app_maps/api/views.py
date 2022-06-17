import json
import mimetypes
from operator import truediv
import struct
from django.http import HttpResponse
from rest_framework.response import Response 
from rest_framework.views import APIView
from yaml import serialize 
from app_maps.models import Equipament
# from app_maps.models import Infrastructure
from .serializers import EquipamentSerializer
from django.core.serializers import serialize

class EquipamentView(APIView):

    def get(self, request):
        equipaments = Equipament.objects.all()
       # teste = Equipament(1,'teste','t2')
        serializer = EquipamentSerializer(equipaments,many=True)
        return Response({'teste':serializer.data})

    def post(self, request):
        equipament = request.data.get('equipament')
        print('AAAAAA')
        print(equipament)
        serializer = EquipamentSerializer(data=equipament)
        if serializer.is_valid(raise_exception=True):
            equipament_saved = serializer.save()
        return Response({"success":"Equipament '{}' created successfully".format(equipament_saved.value)})

    # def get(self, request):
    #     equipaments = Equipament.objects.all()
    #    # teste = Equipament(1,'teste','t2')
    #     serializer = EquipamentSerializer(equipaments,many=True)
    #     response = Response()        
    #     response.data = { 
    #         'nome' : serializer.data
    #     }
    #     return response
    # # class InfrastructureView(APIView):

# #     def get(self, request):
# #         data = serialize('geojson', Infrastructure.objects.all(),
# #                 geometry_field='position',fields=('nomeInfraestructure',))
# #         #reponse.data = serializer.
# #         serializado = json.loads(data)
# #         print(serializado)
# #         data = json.dumps(serializado)
# #         return HttpResponse(data,content_type='application/jsone')#mimetypes
    
# #     def post(self, request):
# #         equipament = request.data.get('equipament')
# #         print(equipament)