import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import Source from 'ol/source/Source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Geometry } from 'ol/geom';
import Draw from 'ol/interaction/Draw'


@Component({
  selector: 'app-open-layer',
  templateUrl: './open-layer.component.html',
  styleUrls: ['./open-layer.component.css']
})
export class OpenLayerComponent implements OnInit {

  map!: Map
  source!: VectorSource<Geometry>
  draw!: Draw;  

  ngOnInit(): void {
    const raster:TileLayer<OSM> = new TileLayer({
      source: new OSM(),
    });

    this.source= new VectorSource({wrapX: false});

    const vector:VectorLayer<VectorSource<Geometry>> = new VectorLayer({
      source: this.source,
    });

    this.map = new Map({
      view: new View({
        center: [-11000000,4600000],
        zoom: 4,
      }),
      layers:[raster,vector],
      // layers: [
      //   new TileLayer({
      //     // source: new XYZ({
      //     //   url: 'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1IjoibmF0YXNpZ3VpIiwiYSI6ImNsMTB1bG1iYjJja3EzbG11NG94dHA4MDkifQ.h6yseMwoU1s1NBiqQ5RPIQ'
      //     // }),
      //     source: new OSM(),
      //   }),
      // ],
      target: 'ol-map'
    });   
    
  }
  addInteraction(value:string): void{    
  console.log('aa'+value)
    if(value !== 'None')
    {
      this.draw = new Draw({
        source:this.source,
        type:value        
      });
      this.map.addInteraction(this.draw)
    }
  }
  interactionMapChange(value:string): void{
    this.map.removeInteraction(this.draw);
    this.addInteraction(value);
  }
  removeMapPoint(): void{
    console.log('onUndo')
    this.draw.removeLastPoint(); 
  }
}
