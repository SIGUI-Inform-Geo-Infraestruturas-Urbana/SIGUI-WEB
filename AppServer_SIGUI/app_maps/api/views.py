from operator import truediv
from rest_framework.response import Response 
from rest_framework.views import APIView
from yaml import serialize 
from app_maps.models import Equipament
from .serializers import EquipamentSerializer

class EquipamentView(APIView):

    def get(self, request):
        equipaments = Equipament.objects.all()
       # teste = Equipament(1,'teste','t2')
        serializer = EquipamentSerializer(equipaments,many=True)
        return Response({'teste':serializer.data})

    def post(self, request):
        equipament = request.data.get('equipament')
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
