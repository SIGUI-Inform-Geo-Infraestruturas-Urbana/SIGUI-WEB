import { Injectable } from '@angular/core';
import { Observable, Subscriber, throwError } from 'rxjs';
import {map} from 'rxjs/operators';
import { RestApiService} from '../../rest-api.service'
import { City} from '../../../models/city.model'
import { Repository } from './repository';
import GeoJSON from 'ol/format/GeoJSON';

@Injectable({
  providedIn: 'root'
})
export class CountyRepositoryService {//implements Repository

  constructor( private restApiService :RestApiService) { }

  // getEntity(id : number = 0):Observable<City[]>{ 
  //   let urlSearch = '/api/data/municipio/';

  //   if (id != 0){
  //     urlSearch = urlSearch + id.toString();
  //   }

  //   let states = this.restApiService.getMunicipios(urlSearch).pipe((map: Observable<string>)=> {
  //     let city : City[] = [];
  //     let statesList = new GeoJSON({featureProjection: 'EPSG:3857' })
  //                       .readFeatures(JSON.stringify(map))
  //     for (let stateObject of statesList) {
  //       let stateNew = new City(stateObject.getId()).deserialize(stateObject.getProperties())
  //       city.push(stateNew);
  //     }
  //     return map;
  //   })
  //   return states;
  // }

  
  // getEntity(id : number = 0):Observable<City[]>{ 
  //   let urlSearch = '/api/data/municipio/';

  //   if (id != 0){
  //     urlSearch = urlSearch + id.toString();
  //   }

  //   let observer:Observable<City[]> = new Observable ( subscriber => {
  //     this.restApiService.getMunicipios(urlSearch).subscribe(res => {
  //       let city : City[] = [];
  //       let statesList = new GeoJSON({featureProjection: 'EPSG:3857' })
  //                         .readFeatures(JSON.stringify(res))
  //       for (let stateObject of statesList) {
  //         let stateNew = new City(stateObject.getId()).deserialize(stateObject.getProperties())
  //         city.push(stateNew);
  //       }    

  //       subscriber.next(city);
  //     })
  //   } )
  //   return observer;
  // }

  // getEntitya(id : number = 0):Observable<City[]>{   
  //   let urlSearch = '/api/data/municipio/';

  //   if (id != 0){
  //     urlSearch = urlSearch + id.toString();
  //   }

  //   let states = this.restApiService.getMunicipios(urlSearch).pipe((map: Observable<string>)=> {
  //     let city : City[] = [];
  //     let statesList = new GeoJSON({featureProjection: 'EPSG:3857' })
  //                       .readFeatures(JSON.stringify(map))
  //     for (let stateObject of statesList) {
  //       let stateNew = new City(stateObject.getId()).deserialize(stateObject.getProperties())
  //       city.push(stateNew);
  //     }
  //     return map;
  //   })
  //   return states;
  // }
  // postEntity: () => void;

   /*
  this.restApi.getState().subscribe((data:string) => {
      console.log('populateState+++++++')
      console.log(data)
      let statesList = new GeoJSON({featureProjection: 'EPSG:3857' })
            .readFeatures(JSON.stringify(data))
      //console.log('populateState')
      //console.log(this.states[0].getProperties())
      for (let stateObject of statesList) {
        let stateNew = new StateEntity(stateObject.getId()).deserialize(stateObject.getProperties())
        this.states.push(stateNew);
      }
      //console.log(stateNew)
    }) */
  
}
