import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber, throwError } from 'rxjs';
import {map} from 'rxjs/operators';
import { CountyRepositoryService } from '../../repositorys/county-repository.service'
import { County} from '../../models/county.model'
import GeoJSON from 'ol/format/GeoJSON';
import { Feature } from 'ol';
import { Geometry, MultiPolygon } from 'ol/geom';
import { CreatorSpatials } from 'src/app/models/creator-spatials';
import { DataSpatial } from 'src/app/models/data-spatial';
import { DataServices } from '../data-services';
import { DataSpatialService } from './data-spatials.service';
import { UnitFederativeRepositoryService } from 'src/app/repositorys/unit-federative-repository.service';

@Injectable({
  providedIn: 'root'
})

export class CountyService extends DataServices{
    
  // constructor(countyRepositoryService:CountyRepositoryService, unitFederativeRepositoryService : UnitFederativeRepositoryService, dataSpatialService : DataSpatialService) { 
  //   super(countyRepositoryService,dataSpatialService);
  // } 
 
  public convertFeature(features :Feature<Geometry>[]):County[]{
    let countieList:County[] = [];
    console.log('aaaaaa')
    for (let index = 0; index < features.length; index++) {

      let city = new County().deserialize(features[index]);
      countieList.push(city);
    }
    return countieList;
  }

  public conversionJson(geojsonObject: string):Feature[]{
    let feature: Feature[] = new GeoJSON({featureProjection: 'EPSG:3857' }).readFeatures(JSON.stringify(geojsonObject));        
    return feature;
  }
  public preparObject(geometryMultPoly: MultiPolygon):string{    
    console.log("objetct")
    console.log(geometryMultPoly)
    var geojson_parser = new GeoJSON();
    var geometryJson = geojson_parser.writeGeometry(geometryMultPoly, {
      dataProjection: 'EPSG:4326',//'EPSG:3857'
      featureProjection: 'EPSG:3857'
    });

    return geometryJson;
  }
  
 
}
