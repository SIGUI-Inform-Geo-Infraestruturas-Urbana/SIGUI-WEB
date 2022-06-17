from xml.dom.minidom import Document
from django import views
from django.urls import include,path
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from .api.views import EquipamentView
# from .api.views import InfrastructureView
#from .api.viewsets import InfraestruturaViewSet,FileUploadViewSet,GeoDadosEspaciaisViewSet,CountyViewSet,StateViewSet,DistrictViewSet
from .api.infraestrutura_viewset import InfraestruturaViewSet
from .api.county_viewset import CountyViewSet
from .api.unit_federative_viewset import UnitFederativeViewset
from .api.district_viewset import DistrictViewSet
from .api.street_viewset import StreetViewSet
from .api.provider_viewset import ProviderViewSet
from .api.subsystem_viewset import SubsystemViewSet
from .api import viewsets
app_name = 'app_maps'

router = routers.SimpleRouter()
router.register(r'provedores', ProviderViewSet,basename='provi')
router.register(r'subsistemas', SubsystemViewSet,basename='subs')
router.register(r'infraestrutura', InfraestruturaViewSet,basename='infra')
router.register(r'files', viewsets.FileUploadViewSet,basename='file')
router.register(r'uploads', viewsets.GeoDadosEspaciaisViewSet,basename='upload')
router.register(r'state', UnitFederativeViewset,basename='state')
router.register(r'municipio', CountyViewSet,basename='municipio')
router.register(r'municipio/(?P<county_id>[0-9]+)', CountyViewSet,basename='municipio')
router.register(r'bairro',DistrictViewSet,basename='bairro')
router.register(r'street', StreetViewSet,basename='rua')

urlpatterns = [
    path('data/', include(router.urls)),
    path('equipament/', EquipamentView.as_view(), name='app_maps'),
    # path('infraestrutura/', InfrastructureView.as_view(), name='app_maps'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)