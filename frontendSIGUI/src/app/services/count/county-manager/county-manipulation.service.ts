import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { County } from 'src/app/models/county.model';
import { DataSpatial } from 'src/app/models/data-spatial';

@Injectable({
  providedIn: 'root'
})
export class CountyManipulationService {

  private readonly _countyManipulation = new BehaviorSubject<County>(new County);
  readonly _countyManipulation$: Observable<County> = this._countyManipulation.asObservable();

  private readonly _countyVisualization = new BehaviorSubject<County>(new County);
  readonly countyVisualization$: Observable<County> = this._countyVisualization.asObservable();
    
  constructor() { }

  getCountyManipulation():Observable<County>{
    return this._countyManipulation$;
  } 

  setCountyManipulation(value : County){
    this._countyManipulation.next(value);
  }

  getCountyVisualization():Observable<County>{
    return this._countyManipulation$;
  } 

  setCountyVisualization(value : County){
    this._countyManipulation.next(value);
  }
}
