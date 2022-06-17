import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {map} from 'rxjs/operators';
import { RestApiService} from '../../rest-api.service'
import { UnitFederal} from '../../../models/unit-federal.model'

@Injectable({
  providedIn: 'root'
})
export class StateRepositoryService {

  constructor( private restApiService :RestApiService) { }

  getStates(id : number):Observable<string>{
    let states:Observable<string> =  this.restApiService.getState().pipe((map:any) => {
     
      return map;
    })
    return states;
  }



 
}
