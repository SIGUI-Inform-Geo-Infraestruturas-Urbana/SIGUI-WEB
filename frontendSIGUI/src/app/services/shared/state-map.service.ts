import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import { BehaviorSubject, Observable, Subject } from "rxjs";


export interface Vertice {
  feature : string,
}

@Injectable({
  providedIn: 'root'
})
export class StateMapService {
  //private featureSelect!: Feature; 
  private featureSelect = new BehaviorSubject<Feature>(new Feature());

  constructor() { }

  setFeatureSelect(feature : Feature):void{
    this.featureSelect.next(feature);
  }

  getFeatureSelect(): Observable<Feature>{
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
