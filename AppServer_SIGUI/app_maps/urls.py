from django import views
from django.urls import include,path
from rest_framework import routers
from .api.views import EquipamentView
from .api.views import InfrastructureView
from .api.viewsets import InfraestruturaViewSet

app_name = 'app_maps'

router = routers.DefaultRouter()
router.register(r'', InfraestruturaViewSet)

urlpatterns = [
    path('infra/', include(router.urls)),
    path('equipament/', EquipamentView.as_view(), name='app_maps'),
    path('infraestrutura/', InfrastructureView.as_view(), name='app_maps'),
]