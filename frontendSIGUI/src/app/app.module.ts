import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule} from '@angular/material/slider'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpenLayerComponent } from './components/maps-components/open-layer/open-layer.component';
import { MapComponent } from './components/maps-components/map/map.component';
import { ScalelineComponent } from './components/maps-components/scaleline/scaleline.component';
import { TopHeaderComponent } from './components/angular-components/top-header/top-header.component';
import { ControlMapComponent } from './components/maps-components/control-map/control-map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserZoneComponent } from './components/angular-components/user-zone/user-zone.component';
import { PageNotFoundComponent } from './components/angular-components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    OpenLayerComponent,
    MapComponent,
    ScalelineComponent,
    TopHeaderComponent,
    ControlMapComponent,
    PageNotFoundComponent,
  ],
  imports: [
    MatSliderModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: 'user-zone', component: UserZoneComponent},
      {path: 'map-view', component: OpenLayerComponent},
      {path: '',redirectTo: '/user-zone',pathMatch:'full'},
      {path: '**', component: PageNotFoundComponent},
    ]),    
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
