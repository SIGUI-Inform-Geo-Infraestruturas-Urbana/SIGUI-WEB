import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule} from '@angular/material/slider';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatExpansionModule} from '@angular/material/expansion'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSnackBarModule} from '@angular/material/snack-bar'
import { MatCardModule} from '@angular/material/card'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MapComponent } from './components/maps-components/map/map.component';
import { ScalelineComponent } from './components/maps-components/scaleline/scaleline.component';
import { TopHeaderComponent } from './components/angular-components/top-header/top-header.component';
import { ControlMapComponent } from './components/maps-components/selectLayers/control-map/control-map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsMapComponent } from './components/maps-components/forms-map/forms-map.component';
import { MousePositionComponentComponent } from './components/maps-components/mouse-position-component/mouse-position-component.component';
import { MousePositionComponent } from './components/maps-components/mouse-position/mouse-position.component';
import { NavigationmenuComponent } from './components/angular-components/navigationmenu/navigationmenu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule} from '@angular/material/tree'
import { MatCheckboxModule} from '@angular/material/checkbox'
import { MatProgressBarModule} from '@angular/material/progress-bar'

import { NavheadersiguiComponent } from './components/angular-components/navheadersigui/navheadersigui.component';
import { ManegerlayersComponent } from './components/maps-components/manegerlayers/manegerlayers.component';
import { LayerSwitcherComponent } from './components/maps-components/layer-switcher/layer-switcher.component';
import { ManageCityComponent } from './components/maps-components/manage-city/manage-city.component';
import { ManageCountyComponent } from './components/angular-components/geodata/geo-elements/manage-city/manage-city.component';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';

import { UserZoneComponent } from './components/angular-components/user-zone/user-zone.component';
import { OpenLayerComponent } from './components/maps-components/open-layer/open-layer.component';
import { PageNotFoundComponent } from './components/angular-components/page-not-found/page-not-found.component';
import { MasterComponent } from './layout/master/master.component';

import { AuthGuard } from './account/shared/auth.guard';
import { GeoEspatialComponent } from './layout/geo-espatial/geo-espatial.component';
import { MenuManegerGeodataComponent } from './components/manager-geodata/menu-maneger-geodata/menu-maneger-geodata.component';
import { PopupOptionsComponent } from './components/maps-components/map-interations-components/popup/popup-options/popup-options.component';
import { PopupOptionsManagerComponent } from './components/maps-components/map-interations-components/popup/popup-options-manager/popup-options-manager.component';
import { ShowUserAdmLoggedDirective } from './account/shared/show-user-adm-logged.directive';
import { ManegerStateComponent } from './components/maps-components/maneger-state/maneger-state.component';
import { ManagerStreetComponent } from './components/maps-components/manager-street/manager-street/manager-street.component';
import { ManegerDistrictComponent } from './components/maps-components/maneger-district/maneger-district.component';
import { ManagerNetworkComponent } from './components/maps-components/manager-network/manager-network.component';
import { ManagerInfrastructureComponent} from './components/maps-components/manager-infrastructure/manager-infrastructure.component';
import { ManagerEstructureComponent } from './components/maps-components/manager-estructure/manager-estructure.component';
import { AssociationInfrastructuresComponent } from './components/maps-components/association-infrastructures/association-infrastructures.component';
import { InfrastructureNetworkComponent } from './components/maps-components/infrastructure-network/infrastructure-network.component';
import { PublicPlaceComponent } from './components/maps-components/manager-public-place/public-place.component'
import { ErrorIntercept } from './error.interceptor';
import { ErrorComponent } from './error/error.component';
import { ErrorService } from './error.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule} from '@angular/material/divider'
import { DialogPopUpComponent } from './dialog-pop-up/dialog-pop-up.component';
import { SelectUnitFederativeComponent } from './components/maps-components/selectLayers/select-unit-federative/select-unit-federative.component'
import { SelectPoligonoComponent } from './components/maps-components/selectLayers/select-unit-poligono/select-unit-poligono.component'
import { SelectLineStringComponent} from './components/maps-components/selectLayers/select-unit-linestring/select-unit-linestring.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { ManagerFileStateComponent } from './components/maps-components/manager-file-state/manager-file-state.component';
import { ExpansionUnitComponent } from './components/manager-geodata/expansion-unit/expansion-unit.component';
import { ManagerGeoUnitComponent } from './components/angular-components/geodata/manager-geo-unit/manager-geo-unit.component';
import { HomePageComponent } from './layout/home-page/home-page.component';
import { GeoDataComponent } from './layout/geo-data/geo-data.component';
import { SidenavGeodataComponent } from './layout/sidenav-geodata/sidenav-geodata.component';
import { ManagerFilePopupComponent } from './components/dialogs-components/manager-file-popup/manager-file-popup.component';
import { TableCountyComponent } from './components/angular-components/geodata/tables/table-county/table-county.component';
import { ManipulateUnitComponent } from './components/angular-components/geodata/geo-elements/manipulates/manipulate-unit/manipulate-unit.component';
import { ManipulateCountyComponent } from './components/angular-components/geodata/geo-elements/manipulates/manipulate-county/manipulate-county.component';
import { PopupControlUnitComponent } from './components/maps-components/map-interations-components/popup-control/popup-control-unit/popup-control-unit.component'
import { PopupControlCountyComponent } from './components/maps-components/map-interations-components/popup-control/popup-control-county/popup-control-county.component';
import { PopupControlDistrictComponent } from './components/maps-components/map-interations-components/popup-control/popup-control-district/popup-control-district.component';
import { PopupControlStreetComponent } from './components/maps-components/map-interations-components/popup-control/popup-control-street/popup-control-street.component';
import { PopupControlPublicplaceComponent } from './components/maps-components/map-interations-components/popup-control/popup-control-publicplace/popup-control-publicplace.component';
import { PopupControlInfrastructureComponent } from './components/maps-components/map-interations-components/popup-control/popup-control-infrastructure/popup-control-infrastructure.component';
import { PopupControlEquipamenturbanComponent } from './components/maps-components/map-interations-components/popup-control/popup-control-equipamenturban/popup-control-equipamenturban.component';
import { LayerManagerComponent } from './components/angular-components/geodata/sidenavs/layer-manager/layer-manager.component';
import { GeodataManagerComponent } from './components/angular-components/geodata/sidenavs/geodata-manager/geodata-manager.component';
import { TreeLayersManagerComponent } from './components/angular-components/geodata/sidenavs/tree-layers-manager/tree-layers-manager.component';
import { ModalFilesCountyComponent } from './components/angular-components/geodata/modals/modal-files-county/modal-files-county.component';
import { ModalFilesUnitComponent } from './components/angular-components/geodata/modals/modal-files-unit/modal-files-unit.component';
import { TreeFilesComponent } from './components/angular-components/geodata/modals/tree-files/tree-files.component';
import { TreeDataComponent } from './components/angular-components/geodata/modals/tree-data/tree-data.component';
import { SnackAlertComponent } from './snack-alert/snack-alert.component';
import { ManipulateDistrictComponent } from './components/angular-components/geodata/geo-elements/manipulates/manipulate-district/manipulate-district.component';
import { ManipulateStreetComponent } from './components/angular-components/geodata/geo-elements/manipulates/manipulate-street/manipulate-street.component';
import { ManipulatePublicPlaceComponent } from './components/angular-components/geodata/geo-elements/manipulates/manipulate-public-place/manipulate-public-place.component';
import { ManipulateInfrastructureComponent } from './components/angular-components/geodata/geo-elements/manipulates/manipulate-infrastructure/manipulate-infrastructure.component';
import { ManipulateUrbanEquipmentComponent } from './components/angular-components/geodata/geo-elements/manipulates/manipulate-urban-equipment/manipulate-urban-equipment.component';
import { ManipulateUrbanNetworkComponent } from './components/angular-components/geodata/geo-elements/manipulates/manipulate-urban-network/manipulate-urban-network.component';
import { ContainerDistrictComponent } from './components/angular-components/geodata/containers/container-district/container-district.component';
import { ContainerStreetComponent } from './components/angular-components/geodata/containers/container-street/container-street.component';
import { ContainerPublicPlaceComponent } from './components/angular-components/geodata/containers/container-public-place/container-public-place.component';
import { ContainerInfrastructureComponent } from './components/angular-components/geodata/containers/container-infrastructure/container-infrastructure.component';
import { ContainerUrbanEquipmentComponent } from './components/angular-components/geodata/containers/container-urban-equipment/container-urban-equipment.component';
import { ContainerUrbanNetworkComponent } from './components/angular-components/geodata/containers/container-urban-network/container-urban-network.component';
import { ContainerUnitComponent } from './components/angular-components/geodata/containers/container-unit/container-unit.component';
import { ContainerCountyComponent } from './components/angular-components/geodata/containers/container-county/container-county.component';
import { ManageUnitComponent } from './components/angular-components/geodata/geo-elements/manage-unit/manage-unit.component';
import { ManageDistrictComponent } from './components/angular-components/geodata/geo-elements/manage-district/manage-district.component';
import { ManageStreetComponent } from './components/angular-components/geodata/geo-elements/manage-street/manage-street.component';
import { ManagePublicPlaceComponent } from './components/angular-components/geodata/geo-elements/manage-public-place/manage-public-place.component';
import { ManageInfrastructureComponent } from './components/angular-components/geodata/geo-elements/manage-infrastructure/manage-infrastructure.component';
import { ManageEquipamentUrbanComponent } from './components/angular-components/geodata/geo-elements/manage-equipament-urban/manage-equipament-urban.component';
import { PopupControlDistrictsComponent } from './components/maps-components/map-interations-components/popup-control/popup-control-districts/popup-control-districts.component'


@NgModule({
  declarations: [
    ManagerEstructureComponent,
    AppComponent,
    OpenLayerComponent,
    MapComponent,
    ScalelineComponent,
    TopHeaderComponent,
    ControlMapComponent,
    PageNotFoundComponent,
    FormsMapComponent,
    MousePositionComponentComponent,
    MousePositionComponent,
    NavigationmenuComponent,
    ShowUserAdmLoggedDirective,
    NavheadersiguiComponent,
    ManegerlayersComponent,
    LayerSwitcherComponent,
    ManageCityComponent,
    ManageCountyComponent,
    LoginComponent,
    CreateAccountComponent,
    HomeComponent,
    AuthenticationComponent,
    MasterComponent,
    GeoEspatialComponent,
    MenuManegerGeodataComponent,
    PopupOptionsComponent,
    PopupOptionsManagerComponent,
    ShowUserAdmLoggedDirective,
    ManegerStateComponent,
    ManegerDistrictComponent,
    ManagerStreetComponent,    
    ManagerNetworkComponent,
    ManagerInfrastructureComponent,
    AssociationInfrastructuresComponent,
    InfrastructureNetworkComponent,
    PublicPlaceComponent,
    ErrorComponent,
    DialogPopUpComponent,
    SelectUnitFederativeComponent,
    SelectPoligonoComponent,
    SelectLineStringComponent,
    SnackBarComponent,
    ManagerFileStateComponent,
    UserZoneComponent,
    ExpansionUnitComponent,
    ManagerGeoUnitComponent,
    HomePageComponent,
    GeoDataComponent,
    SidenavGeodataComponent,
    ManagerFilePopupComponent,
    TableCountyComponent,
    ManipulateUnitComponent,
    ManipulateCountyComponent,
    PopupControlUnitComponent,
    PopupControlCountyComponent,
    PopupControlDistrictComponent,
    PopupControlStreetComponent,
    PopupControlPublicplaceComponent,
    PopupControlInfrastructureComponent,
    PopupControlEquipamenturbanComponent,
    LayerManagerComponent,
    GeodataManagerComponent,
    TreeLayersManagerComponent,
    ModalFilesCountyComponent,
    ModalFilesUnitComponent,
    TreeFilesComponent,
    TreeDataComponent,
    SnackAlertComponent,
    ManipulateDistrictComponent,
    ManipulateStreetComponent,
    ManipulatePublicPlaceComponent,
    ManipulateInfrastructureComponent,
    ManipulateUrbanEquipmentComponent,
    ManipulateUrbanNetworkComponent,
    ContainerDistrictComponent,
    ContainerStreetComponent,
    ContainerPublicPlaceComponent,
    ContainerInfrastructureComponent,
    ContainerUrbanEquipmentComponent,
    ContainerUrbanNetworkComponent,
    ContainerUnitComponent,  
    ContainerCountyComponent, ManageUnitComponent, ManageDistrictComponent, ManageStreetComponent, ManagePublicPlaceComponent, ManageInfrastructureComponent, ManageEquipamentUrbanComponent, PopupControlDistrictsComponent,   


  ],
  imports: [


    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
    MatDialogModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatDividerModule,
    MatTreeModule,
    MatCheckboxModule,
    MatProgressBarModule,

  ],
  providers: [
    DecimalPipe,
    AuthGuard, 
    // {
    //   provide: ErrorHandler,
    //   useClass : ErrorService,
    //  // multi : true
    // }
    {
      provide: HTTP_INTERCEPTORS,
      useClass : ErrorIntercept,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
