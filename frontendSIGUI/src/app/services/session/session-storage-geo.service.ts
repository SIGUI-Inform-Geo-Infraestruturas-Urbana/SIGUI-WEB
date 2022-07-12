import { Injectable } from '@angular/core';
import {ManagerSession } from '../../models/managerSession.model'
@Injectable({
  providedIn: 'root'
})
export class SessionStorageGeoService {

  constructor() { }

  addManagerSession(managerSession : ManagerSession){
    sessionStorage.setItem('sessionview', JSON.stringify(managerSession));
  }
}
