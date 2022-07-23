import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { County } from 'src/app/models/county.model';
import { DataSpatial } from 'src/app/models/data-spatial';
import { Infrastructure } from 'src/app/models/infrastructure.model';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureManipulation {

  private readonly _manipulation = new BehaviorSubject<Infrastructure>(new Infrastructure);
  readonly _manipulation$: Observable<Infrastructure> = this._manipulation.asObservable();

  private readonly _visualization = new BehaviorSubject<Infrastructure>(new Infrastructure);
  readonly visualization$: Observable<Infrastructure> = this._visualization.asObservable();
    
  constructor() { }

  getInfrastructureManipulation():Observable<Infrastructure>{
    return this._manipulation$;
  } 

  setInfrastructureManipulation(value : Infrastructure){
    this._manipulation.next(value);
  }

  getInfrastructureVisualization():Observable<Infrastructure>{
    return this._manipulation$;
  } 

  setInfrastructureVisualization(value : Infrastructure){
    this._manipulation.next(value);
  }
}
