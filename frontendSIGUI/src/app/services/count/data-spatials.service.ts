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

@Injectable({
  providedIn: 'root'
})

export class DataSpatialService {

  private readonly _spatials = new BehaviorSubject<DataSpatial[]>([]);
  readonly spatials$: Observable<DataSpatial[]> = this._spatials.asObservable();
    
  constructor() { }

  getDataSpatial():Observable<DataSpatial[]>{//City[]//Feature<Geometry>
    return this.spatials$;//this._counties.getValue();
  } 

  setDataSpatial(value : DataSpatial[]){//DataSpatial[]
    this._spatials.next(value);
  }

  public converterFromFeatures(cities:DataSpatial[]): Feature[]{
    let features: Feature[] = [] 
    for (let index = 0; index < cities.length; index++) {
      const element = cities[index];
      let featureNew = new Feature({
        id: element.id,
        properties : element,
        geometry : <Geometry>element.geometry
      })
      features.push(featureNew);
    };
    return features;
  }

  // findFetchCounty(idParam : number = 0):boolean{
  //   let urlSearch = '';

  //   if (idParam != 0){
  //     urlSearch = idParam.toString();
  //   }

  //   this.countyRepositoryService.findFetchCounty(urlSearch).subscribe((data : string) => {
  //     let featureObject : Feature<Geometry>[] = this.conversionJson(data);
  //     let cities = this.convertFeature(featureObject);
  //     this._spatials.next(cities);
  //   })
  //   return true;
  // }

  // fetchCountys(){
  //   return this.countyRepositoryService.fetchCountys().pipe();
  // }

  // private convertFeature(features :Feature<Geometry>[]):DataSpatial[]{
  //   let countieList:DataSpatial[] = [];
  //   console.log('aaaaaa')
  //   for (let index = 0; index < features.length; index++) {

  //     let city = new City().deserialize(features[0]);
  //     countieList.push(city);
  //   }
  //   return countieList;
  // }

  // private createData(creator:CreatorSpatials)
  // {
  //   creator.createOperation();

  // }

  // private convertFeatures(features :Feature<Geometry>[]):DataSpatial[]{
  //   let countieList:DataSpatial[] = [];
  //   console.log('aaaaaa')
  //   features.forEach(element => {
  //     let geom :MultiPolygon =<MultiPolygon> element.getGeometry();
  //     let city = new City(element.getId)
  //     console.log('bbbbb')
  //     console.log(city)
  //     console.log('bbbbb****')
  //     //countieList.push()
  //   });

  //   return countieList;
  // }

  // private conversionJson(geojsonObject: string):Feature[]{
  //   let feature: Feature[] = new GeoJSON({featureProjection: 'EPSG:3857' }).readFeatures(JSON.stringify(geojsonObject));        
  //   return feature;
  // }
  
}
