import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber, throwError } from 'rxjs';
import {map} from 'rxjs/operators';
import { CountyRepositoryService } from '../../repositorys/county-repository.service'
import { City} from '../../models/city.model'
import GeoJSON from 'ol/format/GeoJSON';
import { Feature } from 'ol';
import { Geometry, MultiPolygon } from 'ol/geom';

@Injectable({
  providedIn: 'root'
})
export class CountyService {

  private readonly _counties = new BehaviorSubject<City[]>([]);
  readonly counties$: Observable<City[]> = this._counties.asObservable();
    
  constructor(public countyRepositoryService:CountyRepositoryService) { }

  getCounties():Observable<City[]>{//City[]//Feature<Geometry>
    return this.counties$;//this._counties.getValue();
  } 

  private set counties(value : City[]){//City[]
    this._counties.next(value);
  }

  findFetchCounty(idParam : number = 0):boolean{
    let urlSearch = '';

    if (idParam != 0){
      urlSearch = idParam.toString();
    }

    this.countyRepositoryService.findFetchCounty(urlSearch).subscribe((data : string) => {
      let featureObject : Feature<Geometry>[] = this.conversionJson(data);
      let cities = this.convertFeature(featureObject);
      this._counties.next(cities);
    })
    return true;
  }

  fetchCountys(){
    return this.countyRepositoryService.fetchCountys().pipe();
  }

  private convertFeature(features :Feature<Geometry>[]):City[]{
    let countieList:City[] = [];
    console.log('aaaaaa')
    for (let index = 0; index < features.length; index++) {
      let city = new City().deserialize(features[0]);
      countieList.push(city);
    }
    return countieList;
  }

  private convertFeatures(features :Feature<Geometry>[]):City[]{
    let countieList:City[] = [];
    console.log('aaaaaa')
    features.forEach(element => {
      let geom :MultiPolygon =<MultiPolygon> element.getGeometry();
      let city = new City(element.getId)
      console.log('bbbbb')
      console.log(city)
      console.log('bbbbb****')
      //countieList.push()
    });

    return countieList;
  }

  private conversionJson(geojsonObject: string):Feature[]{
    let feature: Feature[] = new GeoJSON({featureProjection: 'EPSG:3857' }).readFeatures(JSON.stringify(geojsonObject));        
    return feature;
  }
  public converterFromFeatures(cities:City[]): Feature[]{
    let features: Feature[] = [] 
    for (let index = 0; index < cities.length; index++) {
      const element = cities[index];
      let featureNew = new Feature({
        id: element.id_County,
        properties : element,
        geometry : <Geometry>element.geometry
      })
      features.push(featureNew);
    };
    return features;
  }
}
