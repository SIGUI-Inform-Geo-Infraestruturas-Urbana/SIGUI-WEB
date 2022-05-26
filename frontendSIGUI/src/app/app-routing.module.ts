import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { UserZoneComponent } from './components/angular-components/user-zone/user-zone.component';
import { OpenLayerComponent } from './components/maps-components/open-layer/open-layer.component';
import { PageNotFoundComponent } from './components/angular-components/page-not-found/page-not-found.component';
import { MasterComponent } from './layout/master/master.component';
import { HomeComponent } from './layout/home/home.component';

import { AuthGuard } from './account/shared/auth.guard'
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    children: [     
      // {path: '',redirectTo: '/user-zone',pathMatch:'full'},
      {path: '', component: UserZoneComponent},
      {path: 'map-view', component: OpenLayerComponent},
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
