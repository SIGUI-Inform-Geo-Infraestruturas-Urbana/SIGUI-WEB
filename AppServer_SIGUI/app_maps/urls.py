from xml.dom.minidom import Document
from django import views
from django.urls import include,path
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from .api.views import EquipamentView
from .api.views import InfrastructureView
from .api.viewsets import InfraestruturaViewSet,FileUploadViewSet,GeoDadosEspaciaisViewSet,CountyViewSet,StateViewSet,DistrictViewSet

app_name = 'app_maps'

router = routers.SimpleRouter()
router.register(r'infraestrutura', InfraestruturaViewSet,basename='infra')
router.register(r'files',FileUploadViewSet,basename='file')
router.register(r'uploads',GeoDadosEspaciaisViewSet,basename='upload')
router.register(r'state',StateViewSet,basename='state')
router.register(r'municipio',CountyViewSet,basename='municipio')
router.register(r'municipio/(?P<county_id>[0-9]+)',CountyViewSet,basename='municipio')
router.register(r'bairro',DistrictViewSet,basename='bairro')

urlpatterns = [
    path('data/', include(router.urls)),
    path('equipament/', EquipamentView.as_view(), name='app_maps'),
    path('infraestrutura/', InfrastructureView.as_view(), name='app_maps'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)