import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ManagerSession} from '../../../models/managerSession.model'

@Injectable({
  providedIn: 'root'
})
export class ManagerVisualizationService {

    //private featureSelect!: Feature; 
    private sessionVisualization = new BehaviorSubject<ManagerSession>(new ManagerSession());

    constructor() { }
  
    setSessionVisualization(visualization : ManagerSession):void{
      this.sessionVisualization.next(visualization);
    }
  
    getSessionVisualization(): Observable<ManagerSession>{
      return this.sessionVisualization.asObservable();
    }
}
