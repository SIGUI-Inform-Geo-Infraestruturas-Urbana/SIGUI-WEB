from django.urls import path
from .api.views import EquipamentView

app_name = 'app_maps'

urlpatterns = [
    path('equipament/', EquipamentView.as_view(), name='app_maps'),
]