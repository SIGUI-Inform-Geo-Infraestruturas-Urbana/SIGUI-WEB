import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber, throwError } from 'rxjs';
import GeoJSON from 'ol/format/GeoJSON';
import { Feature } from 'ol';
import { Geometry, MultiPolygon } from 'ol/geom';
import { DataServices } from '../data-services';
import { District } from 'src/app/models/district.model';

@Injectable({
  providedIn: 'root'
})

export class DistrictService extends DataServices{
    
  // constructor(countyRepositoryService:CountyRepositoryService, unitFederativeRepositoryService : UnitFederativeRepositoryService, dataSpatialService : DataSpatialService) { 
  //   super(countyRepositoryService,dataSpatialService);
  // } 
  
  public convertFeature(features :Feature<Geometry>[]):District[]{
    let districts:District[] = [];
    console.log('aaaaaa')
    for (let index = 0; index < features.length; index++) {

      let unitFederal = new District().deserialize(features[index]);
      districts.push(unitFederal);
    }
    return districts;
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
