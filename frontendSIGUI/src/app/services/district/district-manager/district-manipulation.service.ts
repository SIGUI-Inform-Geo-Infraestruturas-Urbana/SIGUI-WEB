import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { County } from 'src/app/models/county.model';
import { DataSpatial } from 'src/app/models/data-spatial';
import { District } from 'src/app/models/district.model';

@Injectable({
  providedIn: 'root'
})
export class DistrictManipulationService {

  private readonly _manipulation = new BehaviorSubject<District>(new District);
  readonly _manipulation$: Observable<District> = this._manipulation.asObservable();

  private readonly _visualization = new BehaviorSubject<District>(new District);
  readonly visualization$: Observable<District> = this._visualization.asObservable();
    
  constructor() { }

  getCountyManipulation():Observable<District>{
    return this._manipulation$;
  } 

  setCountyManipulation(value : District){
    this._manipulation.next(value);
  }

  getCountyVisualization():Observable<District>{
    return this._manipulation$;
  } 

  setCountyVisualization(value : District){
    this._manipulation.next(value);
  }
}
