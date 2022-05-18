import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileDebug  from 'ol/source/TileDebug';
import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS';
import Source from 'ol/source/Source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Geometry } from 'ol/geom';
import Point  from 'ol/geom/Point';
import Draw from 'ol/interaction/Draw'
import {DrawEvent} from 'ol/interaction/Draw'
import { fromLonLat , toLonLat, transform} from 'ol/proj';
import {Style, Stroke, Icon, Fill} from 'ol/style';
import { MapBrowserEvent, Feature } from 'ol';
import { Coordinate, toStringHDMS } from 'ol/coordinate';
import { Modify , Select, defaults as defaultInteraction} from 'ol/interaction'
//import {SelectFeature} from 'ol/control/Control/SelectFeature'
import Layer from 'ol/layer/Layer';
import { style } from '@angular/animations';
import CircleStyle from 'ol/style/Circle';
import GeoJSON from 'ol/format/GeoJSON';



@Component({
  selector: 'app-open-layer',
  templateUrl: './open-layer.component.html',
  styleUrls: ['./open-layer.component.css']
})
export class OpenLayerComponent implements OnInit {

  coordenadaPoint!:string

  map!: Map
  edited:boolean = true;
  insert_Infra!: boolean
  layerSource!: VectorLayer<VectorSource<Geometry>>
  layerIteration!: VectorLayer<VectorSource<Geometry>>
  source!: VectorSource<Geometry>
  featureState!: Feature<Geometry>[];
  featureSelect!:Feature;
  styleFunction!: any;
  overlayStyle!: any;
  draw!: Draw;  
  marcatores:Feature<Point>[] = [];
  pointMarcator = '/assets/images/logoSIGUi.png';  

  constructor(private renderer:Renderer2){

  }

  ngOnInit(): void { 
    this.mapConstruct();   
    this.insert_Infra = false;

  }   

  mapConstruct():void{      

      const geojsonObject = {
        'type': 'FeatureCollection',
        'crs': {
          'type': 'name',
          'properties': {
            'name': 'EPSG:3857',
          },
        },
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [4e6, -5e6],
            },
          },
        ],
      }

      this.addStyleMap();

      const select = new Select({
        style : this.overlayStyle, 
      })

      const modify = new Modify({
        features: select.getFeatures(),
        style: this.overlayStyle,
        insertVertexCondition: function(){
          return !select
            .getFeatures()
            .getArray()
            .every(function (feature) {
              return feature.getGeometry()?.getType().match('/Polygon/');
            })
        }
      })

      const source = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonObject),
      });

      this.layerSource = new VectorLayer({
        source: this.pointSource(),  
      //  source: source,
        style: this.styleFunction,      
      })

//////

      this.map = new Map({
       interactions: defaultInteraction().extend([select,modify]),
       // layers: [layer],
        target: 'ol-map',
        view: new View({
          center: [ -5480159.755742349, -2930312.646903647 ],
          zoom: 12,
          multiWorld: true,
        }),
      })

      // this.map.on('singleclick', (evt) => this.onClickMap(evt))    

      // const select: SelectFeature = new selectFea 

     // this.addTileLayerOSM();
      this.addTileLayerGeoserver();
      this.map.addLayer( this.layerSource );
      this.addVetorIterationTile();

      // this.map.on('singleclick', function (evt) {
      //   var a = evt.get
        
      // })
  }

  addStyleMap():void{

    this.styleFunction = (function () {

      const pointCircule = new CircleStyle({
        radius: 5,
        fill: undefined,
        stroke: new Stroke({color:'orange',width: 2}),
      });
     //const styles = {} 
      //const point:Style = new Style({image: pointCircule});

      return function(feature:any){
        // let a = feature.getGeometry.getType()
         console.log(feature.getGeometry().getType());
        switch (feature.getGeometry()?.getType()) {
          case 'Point':
            return new Style({image: pointCircule});;
          case 'Polygon':
            return new Style({
              stroke: new Stroke({
                color:'blue',
                width: 3,
              }),
              fill: new Fill({
                color: 'rgba(0,0,255,0.1)'
              })
          });                       
          default:
            return new Style({
              stroke: new Stroke({
                color:'red',
                width: 3,
              }),
              fill: new Fill({
                color: 'rgba(255,0,0,0.1)'
              })
          });  
        }
      }
    })();  
  }
 
  mapOverlayStyle():void{
    this.overlayStyle = (function (){ 
      let poligon = [
        new Style({
          fill: new Fill({
            color: 'rgba(255,255,255,0.5)'
          }),
        }),
        new Style({
          stroke: new Stroke({
            color: 'rgba(255,255,255,1)',
            width: 5,
          }),
        }),
        new Style({
          stroke: new Stroke({
            color: 'rgba(255,255,255,1)',
            width: 3,
          }),
        }),
      ];
      let MultiPolygon = poligon;
      let LineString = [
      new Style({
        stroke: new Stroke({
          color: 'rgba(255,255,255,1)',
          width: 5,
        }),
      }),
      new Style({
        stroke: new Stroke({
          color: 'rgba(0,153,255,1)',
          width: 3,
        }),
      }),
    ];
    let MultiLineString = LineString;
    let point = [
      new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: [0,153,255,1],
          }),
          stroke: new Stroke({
            color: 'rgba(0,153,255,1)',
            width: 3,
          }),
        }),
        zIndex: 100000,
      }),
    ];
    let MultiPoint = point;
    let GeometryCollection = poligon.concat(point);
    return function (feature:any) {
      switch (feature.getGeometry()?.getType()) {
        case 'Point':
          return point;
        case 'Polygon':
          return poligon;               
        default:
          return GeometryCollection;
      };  
    }
    })();

  }


  getAttributions():string{
    const attributions:string =
    '<a href="" target="_blank">&copy; SIGUI</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

    return attributions
  }

  addTileLayerOSM():void{

   
    const raster:TileLayer<OSM> = new TileLayer({
        source: new XYZ({
        attributions: this.getAttributions(),
        url: environment.serverTiledMapServer,
      }),
    });
      this.map.addLayer(raster);
    //  raster.setVisible(false);
  } 
  addTileLayerGeoserver():void{

    const geoserver:TileLayer<TileWMS> = new TileLayer({
      source: new TileWMS({
        attributions:this.getAttributions(),
        url: environment.serverTiledGeoserver,
        params: {LAYERS: environment.tileLayer, TILED: true},
        serverType: 'geoserver',
      })
    })
      this.map.addLayer(geoserver);    
  } 
  addTileLayerDebug():void{
    const debug:TileLayer<TileDebug> = new TileLayer({
      source: new TileDebug(),
    })
  }

  addVetorIterationTile():void{
    this.source= new VectorSource({wrapX: false});

    const styleFunction = function (feature:any){
      console.log('aaa' + feature);
      const geometry = feature.getGeometry();
      const style = new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      })
      return style
    }

    this.layerIteration = new VectorLayer({
      source: this.source,
      style: styleFunction,
    });

    this.map.addLayer(this.layerIteration);  
  }

  pointSource(): VectorSource{
    let marcador = new Feature({
      geometry: new Point(
          fromLonLat([ -49.214693124336485, -25.416153150651212 ])
      ),
     type: 'Point',
    });
    this.marcatores.push(marcador);
    let sou = new VectorSource({
      features: this.marcatores,
  })
  return sou;
  }

  addInteraction(value:string): void{    
  console.log('aa'+value)
    if(value !== 'None')
    {
      this.draw = new Draw({
        source:this.layerIteration.getSource()!,
        type:value        
      });
      this.map.addInteraction(this.draw)

      this.draw.on('drawend', (event:DrawEvent) => {//drawevent
        var feature = event.feature;
        var features = this.layerIteration.getSource()!.getFeatures();
        features = features.concat(feature);
        this.featureState = features;
        console.log('deu certo');
        console.log( this.featureState );

        /*console.log('deu certo');
        console.log(features);
        var geo = features[0].getGeometry();
        console.log(geo);
        var geojson_parser = new GeoJSON();
        var VectorLayerJson = geojson_parser.writeFeatures(features);
        console.log('VectorLayerJson');
        console.log(VectorLayerJson);
        var geometryJson = geojson_parser.writeGeometry(features[0].getGeometry()!);
        console.log('geometryJson');
        console.log(geometryJson);
        console.log(features[0].getId);*/

      } )
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
    let capa = new VectorLayer({
      source: new VectorSource({
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
    let capa = new VectorLayer({
      source: new VectorSource({
          features: this.marcatores,
      }),
    });
    this.map.addLayer(capa);
  }

  enableDivAssociationInfra (feature:Feature):void{
    console.log('eventoRecebido')
    console.log(feature)
    if (feature != undefined)
    {
      this.featureSelect = feature;
      this.edited = this.edited;
    }
  }

  
}