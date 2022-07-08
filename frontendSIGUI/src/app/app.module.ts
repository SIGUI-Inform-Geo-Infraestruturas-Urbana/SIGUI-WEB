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

import { NavheadersiguiComponent } from './components/angular-components/navheadersigui/navheadersigui.component';
import { ManegerlayersComponent } from './components/maps-components/manegerlayers/manegerlayers.component';
import { LayerSwitcherComponent } from './components/maps-components/layer-switcher/layer-switcher.component';
import { ManageCityComponent } from './components/maps-components/manage-city/manage-city.component';
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
import { SidenavGeodataComponent } from './layout/sidenav-geodata/sidenav-geodata.component'


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
