# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import authentication, permissions
# from django.contrib.auth.models import User

# class LayersViewSet(APIView):
#     def get(self, request, format = None):
#         # usernames = [user.username for user in User.objects.all()]
#         return "aaaaaa"#Response(usernames)

from rest_framework import viewsets 
from app_maps.api import serializers
from app_maps import models
class LayersViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.LayersSerializer
    queryset = models.Layers.objects.all()