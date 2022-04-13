import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpenLayerComponent } from './Components/open-layer/open-layer.component';
import { MapComponent } from './Components/map/map.component';
import { ScalelineComponent } from './Components/scaleline/scaleline.component';


@NgModule({
  declarations: [
    AppComponent,
    OpenLayerComponent,
    MapComponent,
    ScalelineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
