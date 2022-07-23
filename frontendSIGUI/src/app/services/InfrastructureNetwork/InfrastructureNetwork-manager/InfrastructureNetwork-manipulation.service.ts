import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { County } from 'src/app/models/county.model';
import { DataSpatial } from 'src/app/models/data-spatial';
import { InfrastructureNetwork } from 'src/app/models/Infrastructure-network.model';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureNetworkManipulation {

  private readonly _manipulation = new BehaviorSubject<InfrastructureNetwork>(new InfrastructureNetwork);
  readonly _manipulation$: Observable<InfrastructureNetwork> = this._manipulation.asObservable();

  private readonly _visualization = new BehaviorSubject<InfrastructureNetwork>(new InfrastructureNetwork);
  readonly visualization$: Observable<InfrastructureNetwork> = this._visualization.asObservable();
    
  constructor() { }

  getInfrastructureNetworkManipulation():Observable<InfrastructureNetwork>{
    return this._manipulation$;
  } 

  setInfrastructureNetworkManipulation(value : InfrastructureNetwork){
    this._manipulation.next(value);
  }

  getInfrastructureNetworkVisualization():Observable<InfrastructureNetwork>{
    return this._manipulation$;
  } 

  setInfrastructureNetworkVisualization(value : InfrastructureNetwork){
    this._manipulation.next(value);
  }
}
