import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { UserZoneComponent } from './components/angular-components/user-zone/user-zone.component';
import { ManageCityComponent} from './components/maps-components/manage-city/manage-city.component'
import { ManegerStateComponent} from './components/maps-components/maneger-state/maneger-state.component'
import { ManegerDistrictComponent} from './components/maps-components/maneger-district/maneger-district.component'
import { FormsMapComponent} from './components/maps-components/forms-map/forms-map.component'

import { ManegerlayersComponent} from './components/maps-components/manegerlayers/manegerlayers.component'
import { OpenLayerComponent } from './components/maps-components/open-layer/open-layer.component';
import { PageNotFoundComponent } from './components/angular-components/page-not-found/page-not-found.component';
import { MasterComponent } from './layout/master/master.component';
import { HomeComponent } from './layout/home/home.component';
import { GeoEspatialComponent  } from './layout/geo-espatial/geo-espatial.component'

import { AuthGuard } from './account/shared/auth.guard'
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';

import { ManagerInfrastructureComponent } from './components/maps-components/manager-infrastructure/manager-infrastructure.component';
import { ManagerNetworkComponent} from './components/maps-components/manager-network/manager-network.component'
import { ManagerEstructureComponent } from './components/maps-components/manager-estructure/manager-estructure.component'
import { PublicPlaceComponent} from './components/maps-components/manager-public-place/public-place.component'
import { ManagerStreetComponent } from './components/maps-components/manager-street/manager-street/manager-street.component';
const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    children: [     
      // {path: '',redirectTo: '/user-zone',pathMatch:'full'},
      {path: '', component: UserZoneComponent},
      {path: 'geo-view', component: GeoEspatialComponent,
      children: [
        {path :'manager-city', component: ManageCityComponent},//app-maneger-state
        {path :'manager-state', component: ManegerStateComponent},//app-maneger-state
        {path :'manager-district', component: ManegerDistrictComponent},//app-maneger-state
        {path :'infrastructure', component: ManagerInfrastructureComponent},//app-maneger-state
        {path :'manager-street', component: ManagerStreetComponent},//app-maneger-state
        {path :'manager-file', component: ManegerlayersComponent},
        {path :'manager-equipament', component: ManagerEstructureComponent},
        {path :'manager-public-place', component: PublicPlaceComponent}

      ]},
      {path: 'network', component: ManagerNetworkComponent},
      // {path: '**', component: PageNotFoundComponent}, 
    ],
    canActivate:[AuthGuard]
  }, 
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {path: '',  redirectTo:'login', pathMatch:'full'},
      {path: 'login', component: LoginComponent},
      {path: 'create-account', component: CreateAccountComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
