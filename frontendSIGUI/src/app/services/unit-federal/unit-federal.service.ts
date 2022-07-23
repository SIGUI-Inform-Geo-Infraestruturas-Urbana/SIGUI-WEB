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
import { DataSpatialService } from '../count/data-spatials.service';
import { UnitFederativeRepositoryService } from 'src/app/repositorys/unit-federative-repository.service';
import { UnitFederal } from 'src/app/models/unit-federal.model';

@Injectable({
  providedIn: 'root'
})

export class UnitFederalService extends DataServices{
    
  // constructor(countyRepositoryService:CountyRepositoryService, unitFederativeRepositoryService : UnitFederativeRepositoryService, dataSpatialService : DataSpatialService) { 
  //   super(countyRepositoryService,dataSpatialService);
  // } 
  
  public convertFeature(features :Feature<Geometry>[]):UnitFederal[]{
    let countieList:UnitFederal[] = [];
    console.log('aaaaaa')
    for (let index = 0; index < features.length; index++) {

      let unitFederal = new UnitFederal().deserialize(features[index]);
      countieList.push(unitFederal);
    }
    return countieList;
  }

  public conversionJson(geojsonObject: string):Feature[]{
    let feature: Feature[] = new GeoJSON({featureProjection: 'EPSG:3857' }).readFeatures(JSON.stringify(geojsonObject));        
    return feature;
  }
  public conversionJsonObject(geojsonObject: string):Feature{
    let feature: Feature = new GeoJSON({featureProjection: 'EPSG:3857' }).readFeature(JSON.stringify(geojsonObject));        
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
