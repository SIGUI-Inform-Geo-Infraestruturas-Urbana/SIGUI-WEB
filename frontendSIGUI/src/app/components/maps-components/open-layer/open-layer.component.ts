import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileDebug  from 'ol/source/TileDebug';
import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS';
import Source from 'ol/source/Source';
import Vectore from 'ol/source/Vector';
import VectorSource from 'ol/source/Vector';
import Vector from 'ol/layer/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Geometry } from 'ol/geom';
import Point  from 'ol/geom/Point';
import Draw from 'ol/interaction/Draw'
import { fromLonLat , transform} from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { MapBrowserEvent, Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';


@Component({
  selector: 'app-open-layer',
  templateUrl: './open-layer.component.html',
  styleUrls: ['./open-layer.component.css']
})
export class OpenLayerComponent implements OnInit {

  map!: Map
  source!: VectorSource<Geometry>
  draw!: Draw;  
  marcatores:Feature<Point>[] = [];
  pointMarcator = '/assets/images/logoSIGUi.png';

  ngOnInit(): void {

    const attributions =
    '<a href="" target="_blank">&copy; SIGUI</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

    const raster:TileLayer<OSM> = new TileLayer({
        source: new XYZ({
        attributions: attributions,
        url: 'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1IjoibmF0YXNpZ3VpIiwiYSI6ImNsMTB1bG1iYjJja3EzbG11NG94dHA4MDkifQ.h6yseMwoU1s1NBiqQ5RPIQ'
      }),
    });

    const geoserver:TileLayer<TileWMS> = new TileLayer({
      source: new TileWMS({
        url: 'http://192.168.56.103:8080/geoserver/wms',
        params: {LAYERS: 'sigui.server:Curitiba', TILED: true},
        serverType: 'geoserver',
      })
    })

    const debug:TileLayer<TileDebug> = new TileLayer({
      source: new TileDebug(),
    })

    this.source= new VectorSource({wrapX: false});

    const vector:VectorLayer<VectorSource<Geometry>> = new VectorLayer({
      source: this.source,
    });

    this.map = new Map({
      view: new View({
        // projection: 'EPSG:38',
        center: [ -5480159.755742349, -2930312.646903647 ], // 
        // center: [19.413793,-99.128145],
        zoom: 12,
      }),
      // layers: [
      //   // new TileLayer({
      //   //   source: new OSM()
      //   // }),
      // ],
      layers:[geoserver,debug,vector],
       target: 'ol-map'
    }); 
    this.map.on('singleclick', (evt) => this.onClickMap(evt))     
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
    //console.log(this.map.getInteractions())
  }
  onClickMap(evt:MapBrowserEvent<any>): void{
    var clickedCoordinate = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')//this.map.getCoordinateFromPixel(evt.pixel);
    console.log(evt.coordinate)
    console.log('onClick')
    console.log(clickedCoordinate)
    this.pointMarcatorMapRegister(clickedCoordinate);
  }
  pointMapRegister(): void{
    console.log('Register');
    let marcador = new Feature({
      geometry: new Point(
          fromLonLat([-99.12105, 19.419617])
      ),
    });
    marcador.setStyle(new Style({
      image: new Icon({
          src: this.pointMarcator,
          scale: 0.2,
      })
    }));
    this.marcatores.push(marcador);
    let capa = new Vector({
      source: new Vectore({
          features: this.marcatores,
      }),
    });
    this.map.addLayer(capa);
  }
  pointMarcatorMapRegister(coordinate:Coordinate): void{
    console.log('Register');
    const a =  fromLonLat(coordinate)
    console.log(a)
    let marcador = new Feature({
      geometry: new Point(
          fromLonLat(coordinate)
      ),
    });
    marcador.setStyle(new Style({
      image: new Icon({
          src: this.pointMarcator,
          scale: 0.2,
      })
    }));
    console.log(this.marcatores)
    this.marcatores.push(marcador);
    let capa = new Vector({
      source: new Vectore({
          features: this.marcatores,
      }),
    });
    this.map.addLayer(capa);
  }
}
