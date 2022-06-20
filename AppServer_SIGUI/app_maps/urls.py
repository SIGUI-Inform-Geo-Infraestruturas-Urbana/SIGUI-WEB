from email.mime import base
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
from .api.streets_viewset import StreetViewSet
from .api.provider_viewset import ProviderViewSet
from .api.subsystem_viewset import SubsystemViewSet
from .api.public_place_viewset import PublicPlaceViewSet
from .api.equipament_urban_viewset import EquipamentUrbanViewSet
from .api.network_viewset import NetworkViewSet
from .api.infraestrutura_network_viewset import InfraestruturaNetworkViewSet
from .api.user_viewset import UserViewSet
from .api import viewsets
app_name = 'app_maps'

router = routers.SimpleRouter()
router.register(r'user', UserViewSet,basename='user')
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
router.register(r'logradouro', PublicPlaceViewSet,basename='rua')
router.register(r'equipament', EquipamentUrbanViewSet,basename='rua')
router.register(r'rede', NetworkViewSet, basename='rua' )
router.register(r'infrarede', InfraestruturaNetworkViewSet, basename='rua' )

urlpatterns = [
    path('data/', include(router.urls)),
    path('equipament/', EquipamentView.as_view(), name='app_maps'),
    # path('infraestrutura/', InfrastructureView.as_view(), name='app_maps'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)