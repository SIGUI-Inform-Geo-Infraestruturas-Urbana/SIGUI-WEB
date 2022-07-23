import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { County } from 'src/app/models/county.model';
import { DataSpatial } from 'src/app/models/data-spatial';
import { District } from 'src/app/models/district.model';
import { EquipmentUrban } from 'src/app/models/equipament-urban.model';

@Injectable({
  providedIn: 'root'
})
export class EquipamentUrbanManipulationService {

  private readonly _manipulation = new BehaviorSubject<EquipmentUrban>(new EquipmentUrban);
  readonly _manipulation$: Observable<EquipmentUrban> = this._manipulation.asObservable();

  private readonly _visualization = new BehaviorSubject<EquipmentUrban>(new EquipmentUrban);
  readonly visualization$: Observable<EquipmentUrban> = this._visualization.asObservable();
    
  constructor() { }

  getEquipamentUrbanManipulation():Observable<EquipmentUrban>{
    return this._manipulation$;
  } 

  setEquipamentUrbanManipulation(value : EquipmentUrban){
    this._manipulation.next(value);
  }

  getEquipamentUrbanVisualization():Observable<EquipmentUrban>{
    return this._manipulation$;
  } 

  setEquipamentUrbanVisualization(value : EquipmentUrban){
    this._manipulation.next(value);
  }
}
