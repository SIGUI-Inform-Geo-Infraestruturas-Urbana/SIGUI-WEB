import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber, throwError } from 'rxjs';
import {map} from 'rxjs/operators';
import { CountyRepositoryService } from '../../repositorys/county-repository.service'
import { County} from '../../models/county.model'
import GeoJSON from 'ol/format/GeoJSON';
import { Feature } from 'ol';
import { Geometry, MultiPolygon, Point } from 'ol/geom';
import { CreatorSpatials } from 'src/app/models/creator-spatials';
import { DataSpatial } from 'src/app/models/data-spatial';
import { InfrastructureNetwork } from 'src/app/models/Infrastructure-network.model';
import { Infrastructure } from 'src/app/models/infrastructure.model';

@Injectable({
  providedIn: 'root'
})

export class DataAssociationService {

  private infraNet : InfrastructureNetwork = new InfrastructureNetwork();

  private readonly _spatials = new BehaviorSubject<InfrastructureNetwork>(this.infraNet);
  readonly spatials$: Observable<InfrastructureNetwork> = this._spatials.asObservable();
 
 
  constructor() {
   // this.infraNet = new InfrastructureNetwork();
  }

  getDataSpatial():Observable<InfrastructureNetwork>{//City[]//Feature<Geometry>
    return this.spatials$;//this._counties.getValue();
  } 

  setDataGeom(value : Geometry){//DataSpatial[]
    this.infraNet.infra_geometry = value
    this._spatials.next(this.infraNet);
  }

  setDataOut(value : Infrastructure){//DataSpatial[]
    this.infraNet.infrastructure_out = value
    this._spatials.next(this.infraNet);
  }

  setnfraNet(value : InfrastructureNetwork){//DataSpatial[]
    this.infraNet = value;
  }
  setnfraNetNext(value : InfrastructureNetwork){//DataSpatial[]
    this.infraNet = value;
    this._spatials.next(this.infraNet);
  }

  getInfraNet():InfrastructureNetwork{//City[]//Feature<Geometry>
    return this.infraNet;//this._counties.getValue();
  } 

  getGeom():Point{//City[]//Feature<Geometry>
    return <Point>this.infraNet.infra_geometry;//this._counties.getValue();
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
