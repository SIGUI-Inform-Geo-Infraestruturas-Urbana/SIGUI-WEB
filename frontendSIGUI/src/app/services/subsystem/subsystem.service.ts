import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber, throwError } from 'rxjs';
import {map} from 'rxjs/operators';
import { CountyRepositoryService } from '../../repositorys/county-repository.service'
import { County} from '../../models/county.model'
import GeoJSON from 'ol/format/GeoJSON';
import { Feature } from 'ol';
import { Geometry, LineString, MultiPolygon } from 'ol/geom';
import { DataServices } from '../data-services';
import { Street } from 'src/app/models/street.model';
import { Subsystem } from 'src/app/models/subsystem.model';

@Injectable({
  providedIn: 'root'
})

export class SubsystemService {
    
  // constructor(countyRepositoryService:CountyRepositoryService, unitFederativeRepositoryService : UnitFederativeRepositoryService, dataSpatialService : DataSpatialService) { 
  //   super(countyRepositoryService,dataSpatialService);
  // } 
 
  public convertFeature(features :Feature<Geometry>[]):Street[]{
    let streetList:Street[] = [];
    console.log('aaaaaa')
    for (let index = 0; index < features.length; index++) {

      let street = new Street().deserialize(features[index]);
      streetList.push(street);
    }
    return streetList;
  }

  public conversionJson(jsonObject: string):Street[]{

    let streetList:Street[] = [];
    for (let index = 0; index < jsonObject.length; index++) {

      let street = new Street()//.deserialize(features[index]);
      streetList.push(street);
    }
   
    return streetList;
    //let feature: Feature[] = new GeoJSON({featureProjection: 'EPSG:3857' }).readFeatures(JSON.stringify(geojsonObject));        
    //return feature;
  }
  public conversionJsonObject(geojsonObject: string):Feature{
    let feature: Feature = new GeoJSON({featureProjection: 'EPSG:3857' }).readFeature(JSON.stringify(geojsonObject));        
    return feature;
  }
  public preparObject(lineString: LineString):string{    
    console.log("objetct")
    console.log(lineString)
    var geojson_parser = new GeoJSON();
    var geometryJson = geojson_parser.writeGeometry(lineString, {
      dataProjection: 'EPSG:4326',//'EPSG:3857'
      featureProjection: 'EPSG:3857'
    });

    return geometryJson;
  }
  
 
}
