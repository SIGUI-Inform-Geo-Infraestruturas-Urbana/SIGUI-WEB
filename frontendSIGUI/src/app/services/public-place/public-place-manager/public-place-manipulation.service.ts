import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { County } from 'src/app/models/county.model';
import { DataSpatial } from 'src/app/models/data-spatial';
import { PublicPlace } from 'src/app/models/public-place.model';

@Injectable({
  providedIn: 'root'
})
export class PublicPlaceManipulation {

  private readonly _manipulation = new BehaviorSubject<PublicPlace>(new PublicPlace);
  readonly _manipulation$: Observable<PublicPlace> = this._manipulation.asObservable();

  private readonly _visualization = new BehaviorSubject<PublicPlace>(new PublicPlace);
  readonly visualization$: Observable<PublicPlace> = this._visualization.asObservable();
    
  constructor() { }

  getPublicPlaceManipulation():Observable<PublicPlace>{
    return this._manipulation$;
  } 

  setPublicPlaceManipulation(value : PublicPlace){
    this._manipulation.next(value);
  }

  getPublicPlaceVisualization():Observable<PublicPlace>{
    return this._manipulation$;
  } 

  setPublicPlaceVisualization(value : PublicPlace){
    this._manipulation.next(value);
  }
}
