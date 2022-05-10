import { Component, OnInit } from '@angular/core';
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
import { fromLonLat , transform} from 'ol/proj';
import {Style, Stroke, Icon, Fill} from 'ol/style';
import { MapBrowserEvent, Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Modify , Select, defaults as defaultInteraction} from 'ol/interaction'
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

  map!: Map
  source!: VectorSource<Geometry>
  draw!: Draw;  
  marcatores:Feature<Point>[] = [];
  pointMarcator = '/assets/images/logoSIGUi.png';  

  ngOnInit(): void { 
    this.mapConstruct();
  }

  mapConstructing():void{

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

    const styleFunction = function (feature:any){
      console.log(feature);
      const geometry = feature.getGeometry();
      const styles = [
        // linestring
        new Style({
          stroke: new Stroke({
            color: '#ffcc33',
            width: 20,
          }),
        }),
      ];
      return styles
    }

    const vector:VectorLayer<VectorSource<Geometry>> = new VectorLayer({
      source: this.source,
      style: styleFunction,
    });

    this.map = new Map({
      view: new View({
        // projection: 'EPSG:38',
        center: [ -5480159.755742349, -2930312.646903647 ], // 
        // center: [19.413793,-99.128145],
        zoom: 12,
      }),
      layers:[raster,debug,vector],
      target: 'ol-map'
    }); 
    this.map.on('singleclick', (evt) => this.onClickMap(evt))    
  }

  mapConstruct():void{

      const styleFunction = (function () {

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

      const overlayStyle = (function (){ 
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

      const select = new Select({
        style : overlayStyle, 
      })

      const modify = new Modify({
        features: select.getFeatures(),
        style: overlayStyle,
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

      const layer = new VectorLayer({
        source: this.pointSource(),  
      //  source: source,
        style: styleFunction,      
      })

      this.map = new Map({
        interactions: defaultInteraction().extend([select,modify]),
        layers: [layer],
        target: 'ol-map',
        view: new View({
          center: [ -5480159.755742349, -2930312.646903647 ],
          zoom: 12,
          multiWorld: true,
        }),
      })
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
        source:this.pointSource(),
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
  
}
