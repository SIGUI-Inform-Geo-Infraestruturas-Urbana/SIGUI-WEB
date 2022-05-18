import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule} from '@angular/material/slider';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

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
import { FormsMapComponent } from './components/maps-components/forms-map/forms-map.component';
import { MousePositionComponentComponent } from './components/maps-components/mouse-position-component/mouse-position-component.component';
import { MousePositionComponent } from './components/maps-components/mouse-position/mouse-position.component';
import { NavigationmenuComponent } from './components/angular-components/navigationmenu/navigationmenu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MapIterationsComponent } from './components/maps-components/map-iterations/map-iterations.component';
import { NavheadersiguiComponent } from './components/angular-components/navheadersigui/navheadersigui.component';

@NgModule({
  declarations: [
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
    MapIterationsComponent,
    NavheadersiguiComponent,
  ],
  imports: [
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'user-zone', component: UserZoneComponent},
      {path: 'map-view', component: OpenLayerComponent},
      {path: '',redirectTo: '/user-zone',pathMatch:'full'},
      {path: '**', component: PageNotFoundComponent},
    ]),    
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
