import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { County } from 'src/app/models/county.model';
import { DataSpatial } from 'src/app/models/data-spatial';
import { UnitFederal } from 'src/app/models/unit-federal.model';

@Injectable({
  providedIn: 'root'
})
export class UnitManipulation {

  private readonly _manipulation = new BehaviorSubject<UnitFederal>(new UnitFederal);
  readonly _manipulation$: Observable<UnitFederal> = this._manipulation.asObservable();

  private readonly _visualization = new BehaviorSubject<UnitFederal>(new UnitFederal);
  readonly visualization$: Observable<UnitFederal> = this._visualization.asObservable();
    
  constructor() { }

  getUnitManipulation():Observable<UnitFederal>{
    return this._manipulation$;
  } 

  setUnitManipulation(value : UnitFederal){
    this._manipulation.next(value);
  }

  getUnitVisualization():Observable<UnitFederal>{
    return this._manipulation$;
  } 

  setUnitVisualization(value : UnitFederal){
    this._manipulation.next(value);
  }
}
