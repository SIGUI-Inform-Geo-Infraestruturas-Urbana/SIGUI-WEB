import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { County } from 'src/app/models/county.model';
import { DataSpatial } from 'src/app/models/data-spatial';
import { Street } from 'src/app/models/street.model';

@Injectable({
  providedIn: 'root'
})
export class StreetManipulation {

  private readonly _manipulation = new BehaviorSubject<Street>(new Street);
  readonly _manipulation$: Observable<Street> = this._manipulation.asObservable();

  private readonly _visualization = new BehaviorSubject<Street>(new Street);
  readonly visualization$: Observable<Street> = this._visualization.asObservable();
    
  constructor() { }

  getStreetManipulation():Observable<Street>{
    return this._manipulation$;
  } 

  setStreetManipulation(value : Street){
    this._manipulation.next(value);
  }

  getStreetVisualization():Observable<Street>{
    return this._manipulation$;
  } 

  setStreetVisualization(value : Street){
    this._manipulation.next(value);
  }
}
