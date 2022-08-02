import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { controlViewData } from 'src/app/models/control-view-data.model';
import { County } from 'src/app/models/county.model';
import { DataSpatial } from 'src/app/models/data-spatial';


export interface Vertice {
  feature : string,
}

@Injectable({
  providedIn: 'root'
})
export class StateMapService {
  //private featureSelect!: Feature; 
  private featureSelect = new BehaviorSubject<controlViewData>(new controlViewData());

  constructor() { }

  setFeatureSelect(feature : controlViewData):void{
    this.featureSelect.next(feature);
  }

  getFeatureSelect(): Observable<controlViewData>{
    return this.featureSelect.asObservable();
  }

  /*private featureSelect = new BehaviorSubject<Vertice>({feature : 'Teste'});

  constructor() { }

  setFeatureSelect(feature : Vertice):void{
    this.featureSelect.next(feature);
  }

  getFeatureSelect(): Observable<Vertice>{
    return this.featureSelect.asObservable();
  }*/
}
