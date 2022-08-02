import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

import OlMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileDebug  from 'ol/source/TileDebug';
import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS';
import Source from 'ol/source/Source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Group from 'ol/layer/Group';
import { Geometry, LineString, MultiPolygon } from 'ol/geom';
import Point  from 'ol/geom/Point';
import Draw from 'ol/interaction/Draw'
import {DrawEvent} from 'ol/interaction/Draw'
import { fromLonLat , toLonLat, transform} from 'ol/proj';
import {Style, Stroke, Icon, Fill} from 'ol/style';
import { MapBrowserEvent, Feature, Collection } from 'ol';
import { Coordinate, toStringHDMS } from 'ol/coordinate';
import { Modify , Select, defaults as defaultInteraction, Interaction} from 'ol/interaction'
//import {SelectFeature} from 'ol/control/Control/SelectFeature'
import Layer from 'ol/layer/Layer';
import { style } from '@angular/animations';
import CircleStyle from 'ol/style/Circle';
import GeoJSON from 'ol/format/GeoJSON';

import {RestApiService} from '../../../services/rest-api.service'
import { CountyService} from '../../../services/count/county.service'
import { Observable } from 'rxjs';

import {County} from '../../../models/county.model'
import { DataSpatialService } from 'src/app/services/count/data-spatials.service';
import { DataSpatial } from 'src/app/models/data-spatial';
import { CountyRepositoryService } from 'src/app/repositorys/county-repository.service';
import BaseLayer from 'ol/layer/Base';

@Component({
  selector: 'app-open-layer',
  templateUrl: './open-layer.component.html',
  styleUrls: ['./open-layer.component.css']
})
export class OpenLayerComponent implements OnInit {

  @Input() map!:OlMap;
  coordenadaPoint!:string
  private contadorIdMap : number = 0;

  //map: OlMap
  // edited:boolean = false;
  // insert_Infra!: boolean
  // layerSource!: VectorLayer<VectorSource<Geometry>>
  layerIteration!: VectorLayer<VectorSource<Geometry>>
  source!: VectorSource<Geometry>
  // featureState!: Feature<Geometry>[];
  // featureSelect!:Feature;
  styleFunction!: any;
  overlayStyle!: any;
  draw!: Draw;  
  marcatores:Feature<Point>[] = [];
  pointMarcator = '/assets/images/logoSIGUi.png';
  sourceData!:VectorSource;
  sourceunit!:VectorSource;
  sourcestreet!:VectorSource;
  sourcecounty!:VectorSource;
  sourcedistrict!:VectorSource;
  sourcepublicplace!:VectorSource;
  sourceinfrastructure!:VectorSource;
  sourcerede!:VectorSource;
  sourceequipamente!:VectorSource;  

  sourceInfrastructure!:VectorSource;

 
  
  
  constructor(public restApi: RestApiService, public dataSpatialService : DataSpatialService, 
    public countyRepository : CountyRepositoryService){// public countyService : CountyService

  }

  

  ngOnInit(): void {
    console.log('TestMap');
    console.log(this.map);

    this.mapConstruct();
    
    // this.insert_Infra = false;
    this.dataSpatialService.getDataSpatial().subscribe((data: DataSpatial[]) => {
      console.log('///////////');
      console.log(data)  
      
      let features: Feature[] = [] 
      for (let index = 0; index < data.length; index++) {
        //this.contadorIdMap = this.contadorIdMap + 1;

        const element = data[index];
        switch (element.typeRepresentation) {
          case 'layer_vector_unit':
            let featureUnit= new Feature({
              id:element.id, //this.contadorIdMap,
              properties : element,
              geometry : <Geometry>element.geometry
            })
            
            this.sourceunit.addFeature(featureUnit);
            break;
            case 'layer_vector_county':
              let featurecounty = new Feature({
                id:element.id, //this.contadorIdMap,
                properties : element,
                geometry : <Geometry>element.geometry
              })
              this.sourcecounty.addFeature(featurecounty);
              break;
          case 'layer_vector_district':
            let featuredistrict = new Feature({
              id:element.id, //this.contadorIdMap,
              properties : element,
              geometry : <Geometry>element.geometry
            })
            this.sourcedistrict.addFeature(featuredistrict);
            break;
          case 'layer_vector_publicplace':

            console.log('/////sasadsds//////');
            let a = <Geometry> element.geometry;
            console.log(a);
          

            let featurepublicplace= new Feature({
              id:element.id, //this.contadorIdMap,
              properties : element,
              geometry : <Geometry>element.geometry
            })
            this.sourcepublicplace.addFeature(featurepublicplace);
            break;
            
          case 'layer_vector_street':
            let featureStreet = new Feature({
              id:element.id, //this.contadorIdMap,
              properties : element,
              geometry : <Geometry>element.geometry
            })
            this.sourcestreet.addFeature(featureStreet);
            break;
          case 'layer_vector_infrastructure':
            let featureInfrastructura = new Feature({
              id:element.id, //this.contadorIdMap,
              properties : element, 
              geometry : <Geometry>element.geometry
            })
            
            this.sourceInfrastructure.addFeature(featureInfrastructura);
            break;   
            case 'layer_vector_rede':
              let featureinfraNet = new Feature({
                id:element.id, //this.contadorIdMap,
                properties : element, 
                geometry : <Geometry>element.geometry
              })
              
              this.sourcerede.addFeature(featureinfraNet);
              break;       
          case 'layer_vector_equipament':
              let featureestructure = new Feature({
                id:element.id, //this.contadorIdMap,
                properties : element, 
                geometry : <Geometry>element.geometry
              })
              
              this.sourceequipamente.addFeature(featureestructure);
              break;  
          default:
            break;
        }        
       
      };         

     // this.sourceData.addFeatures(this.dataSpatialService.converterFromFeatures(data));
    });

    // this.countyService.getCounties().subscribe((cities: City[]) => {
    //   console.log('///////////');
    //   console.log(cities)           
    //   this.sourceData.addFeatures(this.countyService.converterFromFeatures(cities));
    // });
  }; 

  setPropertsMap(evt:MapBrowserEvent<any>){

  }

  mapConstruct():void{
    
    if(this.map != undefined){

      this.addStyleMap();
      let intSelect = this.mapSelect();
      let interation: Collection<Interaction> = defaultInteraction()
        .extend([intSelect,this.maṕInteraction(intSelect)])   

      interation.forEach((interac) => {this.map.addInteraction(interac)})     
    
      //this.map.on('addfeature', (evt) => this.setPropertsMap(evt))    

       // this.map.on('singleclick', (evt) => this.onClickMap(evt))    

      this.addTileLayerGeoserver();
      this.addVetorIterationTile();

      this.addLoadData();
      this.addLoadDataUnit();
      this.addLoadDataCounty();
      this.addLoadDataDistrict();
      this.addLoadDataStreet();
      this.addLoadDataPublicPlace();
      this.addLoadDataRede(); 
      this.addLoadDataInfrastructure();
      this.addLoadDataEquipament();
    }

    // this.map = new OlMap({
    //   interactions: 
    //   // layers: [layer],
    //    target: 'ol-map',
    //    view: new View({
    //      center: [ -5480159.755742349, -2930312.646903647 ],
    //      zoom: 12,
    //      multiWorld: true,
    //    }),
    //  })
  }

  mapSelect():Select{
    const select = new Select({
      style : this.overlayStyle, 
    })
    return select;
  }

  maṕInteraction(select :Select):Modify{
  
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
    return modify;

  } 

  addStyleMap():void{

    this.styleFunction = (function () {

      const pointCircule = new CircleStyle({
        radius: 5,
        fill: undefined,
        stroke: new Stroke({color:'orange',width: 2}),
      });

      return function(feature:any){
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
          case 'MultiPolygon':
            return [
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
            ]                  
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
    raster.set('name','layer_rasterTerrain')
    this.map.addLayer(raster);
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
    geoserver.set('name','layer_vectorTerrain')
    this.map.addLayer(geoserver);    
  } 
  addTileLayerDebug():void{
    const debug:TileLayer<TileDebug> = new TileLayer({
      source: new TileDebug(),
    })
  }
  addLoadData():void{
    this.sourceData = new VectorSource({});

    let layerSource = new VectorLayer({
          source: this.sourceData,
          style: this.styleFunction,
        })     

      layerSource.set('name','layer_vector_load')
      //   this.map.addLayer( layerSource )
      this.map.addLayer( layerSource );
  }
  addLoadDataUnit():void{
    this.sourceunit = new VectorSource({});

    let layerSource = new VectorLayer({
          source: this.sourceunit,
          style: this.styleFunction,
        })     

      layerSource.set('name','layer_vector_unit')
      //   this.map.addLayer( layerSource )
      this.map.addLayer( layerSource );
  }
  addLoadDataCounty():void{
    this.sourcecounty = new VectorSource({});

    let layerSource = new VectorLayer({
          source: this.sourcecounty,
          style: this.styleFunction,
        })     

      layerSource.set('name','layer_vector_county')
      //   this.map.addLayer( layerSource )
      this.map.addLayer( layerSource );    
     
  }
  addLoadDataDistrict():void{
    this.sourcedistrict = new VectorSource({});

    let layerSource = new VectorLayer({
          source: this.sourcedistrict,
          style: this.styleFunction,
        })     

      layerSource.set('name','layer_vector_district')
      //   this.map.addLayer( layerSource )
      this.map.addLayer( layerSource );
  }
  addLoadDataPublicPlace():void{
    this.sourcepublicplace = new VectorSource({});

    let layerSource = new VectorLayer({
          source: this.sourcepublicplace,
          style: this.styleFunction,
        })     

      layerSource.set('name','layer_vector_public_place')
      //   this.map.addLayer( layerSource )
      this.map.addLayer( layerSource );
  }
  addLoadDataStreet():void{
    this.sourcestreet = new VectorSource({});

    let layerSource = new VectorLayer({
          source: this.sourcestreet,
          style: this.styleFunction,
        })     

      layerSource.set('name','layer_vector_street')
      //   this.map.addLayer( layerSource )
      this.map.addLayer( layerSource );
  }
  addLoadDataInfrastructure():void{
    this.sourceInfrastructure = new VectorSource({});

    let layerSource = new VectorLayer({
          source: this.sourceInfrastructure,
          style: this.styleFunction,
        })     

      layerSource.set('name','layer_vector_infrastructure')
      //   this.map.addLayer( layerSource )
      this.map.addLayer( layerSource );
  }
  addLoadDataEquipament():void{
    this.sourceequipamente = new VectorSource({});

    let layerSource = new VectorLayer({
          source: this.sourceequipamente,
          style: this.styleFunction,
        })     

      layerSource.set('name','layer_vector_equipament')
      //   this.map.addLayer( layerSource )
      this.map.addLayer( layerSource );
  }
  addLoadDataRede():void{
    this.sourcerede = new VectorSource({});

    let layerSource = new VectorLayer({
          source: this.sourcerede,
          style: this.styleFunction,
        })     

      layerSource.set('name','layer_vector_rede')
      //   this.map.addLayer( layerSource )
      this.map.addLayer( layerSource );
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
    this.layerIteration.set('name','layer_vectorIteration')
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

  getFeatureById(){

    this.map.getLayerGroup().get

    // this.map.getLayerGroup().ge.forEach((element : BaseLayer) => {
    //   var a = element;
    //   console.log(element)
      
    //   // let vector : VectorLayer<VectorSource<Geometry>> = <VectorLayer<VectorSource<Geometry>>> element
    //   // //let a : VectorLayer = <VectorLayer<VectorSource>> element
    //   // var features = <VectorSource> vector.getSource()//?.getFeatureById(this.contadorIdMap)
    //   // console.log(features)
    //   // console.log(features.getAttributions)
    //   // //var featur = features.forEachFeature
    //   // console.log('features')
    //   // //console.log(featur)
    // });

    
    // this.map.getLayers().getArray().forEach((element:BaseLayer)=> {
    //   let get = <VectorSource<Geometry> element
    //   element.gets

    // });;
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
        this.contadorIdMap = this.contadorIdMap + 1;
        event.feature.setId(this.contadorIdMap);
        let even = event.feature;
        event.feature = this.dataSpatialService.definedGeomIteration(even);

        // var features = this.layerIteration.getSource()!.getFeatures();
        // features = features.concat(feature);
        // this.featureState = features;

        ///////var features = this.layerIteration.getSource()?.getFeatureById(this.contadorIdMap)

        

  
        // console.log( this.featureState );

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
    console.log('DEU CERTO !!!!!!!!!!!!!!!');
    this.getFeatureById()
    console.log('DEU CERTO !!!!!!!!!!!!!!!');
  }
  removeMapPoint(): void{
    console.log('onUndo')
    //this.draw.removeLastPoint(); 
    this.layerIteration.getSource()?.clear();
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

  // enableDivAssociationInfra (feature:Feature):void{
  //   console.log('eventoRecebido')
  //   console.log(feature)
  //   if (feature != undefined)
  //   {
  //     this.featureSelect = feature;
  //     this.edited = !this.edited;
  //   }
  // }
  // enableDivAssociationCity (feature:Feature):void{
  //   console.log('eventoRecebido')
  //   console.log(feature)
  //   if (feature != undefined)
  //   {
  //     this.featureSelect = feature;
  //     //this.panelOpenAdMunicios = !this.panelOpenAdMunicios;
  //   }
  // }

  addLayerVetorMunicipios(){
      console.log("entrou")
      //this.countyService.findFetchCounty();    
      // this.restApi.getMunicipios().subscribe((geojsonObject : {}) => {
      //   console.log('populate')  
        
      //   console.log(geojsonObject)      
      //   const source = new VectorSource({
      //     features: new GeoJSON({featureProjection: 'EPSG:3857' }).readFeatures(JSON.stringify(geojsonObject))        
      //   });
      //   let layerSource = new VectorLayer({
      //     source: source,  
  
      //     style: this.styleFunction,
      //   })      
      //   layerSource.set('name','layer_vectorIteration')
      //   this.map.addLayer( layerSource );
      // })  
    }

  addGetByIdCounty(id : number){
    console.log('CHEGOY******************');
    this.countyRepository.findFetchData(id);    
  }
  
}
